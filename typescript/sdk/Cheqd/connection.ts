import qrcode from "qrcode-terminal";
import { CheqdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

/**
 * Creates a connection invitation for a tenant using the provided CheqdEcosystem client,
 * displays the invitation as a QR code, and waits for the remote party to accept the connection.
 *
 * This function:
 * - Calls the client's createConnectionInvitation API to create an invitation.
 * - Generates and displays a QR code for the invitation (via qrcode.generate).
 * - Polls the connection status (via checkConnectionStatus) until the connection is established.
 * - Logs informational messages (via chalk).
 *
 * @param tenantId - The tenant identifier for which the connection invitation will be created.
 * @param client - An initialized CheqdEcosystem client instance used to create the invitation and check status.
 * @param label - Optional human-readable label for the connection. Defaults to "Your Connection Label".
 *
 * @returns A Promise that resolves to the established connection record (the first item in the checkConnectionStatus response).
 *
 * @throws {Error} If the createConnectionInvitation call is not successful; the thrown error will contain the client's error message.
 */
export const createConnection = async (
  tenantId: string,
  client: InstanceType<typeof CheqdEcosystem>,
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
 * Polls a Cheqd connection until it reaches the "completed" state or a timeout occurs.
 *
 * This function repeatedly calls client.getConnectionById({ tenantId, invitationId }) every 5 seconds,
 * up to 24 attempts (~120 seconds). If the first item in the returned response array has a state of
 * "completed", the promise resolves with the result object. The polling interval is cleared on success,
 * timeout, or any error.
 *
 * @param tenantId - The tenant identifier used to scope the connection lookup.
 * @param invitationId - The invitation identifier corresponding to the connection to check.
 * @param client - An instance of CheqdEcosystem that exposes a getConnectionById method.
 *
 * @returns A Promise that resolves with the result object returned from client.getConnectionById when the
 *          connection reaches state "completed".
 *
 * @throws Will reject with an Error("Connection acceptance timed out.") if the connection is not completed
 *         within the polling window (~120 seconds). Will also reject with any error thrown by
 *         client.getConnectionById.
 *
 */
export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string,
  client: InstanceType<typeof CheqdEcosystem>
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
