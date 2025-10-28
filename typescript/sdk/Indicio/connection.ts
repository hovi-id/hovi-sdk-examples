import qrcode from "qrcode-terminal";
import { CheqdEcosystem, IndicioEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

/**
 * Creates a connection invitation for a tenant, displays a QR code for the invitation,
 * and waits for the connection to be accepted.
 *
 * @remarks
 * - Uses the provided IndicioEcosystem client to create a connection invitation.
 * - Generates a small QR code from the returned `invitationBase64` that should be scanned
 *   to accept the invitation. The QR/invitation is time-limited (accepted within ~2 minutes
 *   in the current flow) otherwise a new invitation must be created.
 * - After creating the invitation, it polls/checks the connection status (via
 *   `checkConnectionStatus`) and resolves once the connection is established.
 * - On success, the established connection object is returned (the first element of the
 *   connection status response array).
 *
 * @param tenantId - The tenant identifier for which to create the connection invitation.
 * @param client - An initialized IndicioEcosystem client instance used to create the invitation
 *                 and query connection status.
 * @param label - Optional human-readable label for the connection invitation. Defaults to
 *                `"Your Connection Label"` when not provided.
 *
 * @returns A Promise that resolves to the established connection object (the first element of
 *          the connection status response) when the connection is successfully established.
 *
 * @throws {Error} If the call to create the connection invitation fails (when `result.success`
 *                 is falsy), an Error is thrown with the returned message.
 */
export const createConnection = async (
  tenantId: string,
  client: InstanceType<typeof IndicioEcosystem>,
  label?: string
) => {
  label = label || "Your Connection Label";
  const result: any = await client.createConnectionInvitation({
    tenantId,
    label,
  });
  if (!result.success) throw new Error(result.message);
  qrcode.generate(result?.response?.invitationBase64!, { small: true });
  chalk.green(
    `Accept the connection request using the QR code above in next 2 min otherwise you will have to create the connection again.`
  );
  const connectionStatus = await checkConnectionStatus(
    tenantId,
    result?.response?.invitationId!,
    client
  );
  chalk.green("Connection established!");
  return connectionStatus.response[0];
};

/**
 * Polls the Indicio ecosystem for the status of a connection invitation until it reaches the
 * "completed" state or until a timeout occurs.
 *
 * @remarks
 * - Polls by calling `client.getConnectionById({ tenantId, invitationId })` every 5 seconds.
 * - Resolves when `result?.response && result.response[0].state === "completed"`.
 * - After 24 polling attempts the poll is stopped and the promise is rejected with
 *   `new Error("Connection acceptance timed out.")`. This equates to roughly 2 minutes of polling.
 * - If `client.getConnectionById` throws, polling is stopped and the promise is rejected with that error.
 *
 * @param tenantId - The tenant identifier used to scope the connection lookup.
 * @param invitationId - The invitation/connection identifier to check the status for.
 * @param client - An instance of `IndicioEcosystem` (expected to implement `getConnectionById`).
 *
 * @returns A Promise that resolves with the raw result returned by `client.getConnectionById` when
 *          the connection reaches the "completed" state, or rejects on timeout or client errors.
 *
 * @throws Error - Throws `"Connection acceptance timed out."` when the maximum number of polling
 *                 attempts is reached, or rethrows any error produced by the client call.
 */
export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string,
  client: InstanceType<typeof IndicioEcosystem>
) => {
  let pollCount = 0;
  return new Promise<any>((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        if (pollCount >= 24) {
          clearInterval(interval);
          reject(new Error("Connection acceptance timed out."));
        }
        pollCount++;
        const result = await client.getConnectionById({
          tenantId,
          invitationId,
        });
        if (result?.response && result.response[0].state === "completed") {
          clearInterval(interval);
          resolve(result);
        }
      } catch (error) {
        clearInterval(interval);
        console.log("Error checking connection status:", error);
        reject(error);
      }
    }, 5000);
  });
};
