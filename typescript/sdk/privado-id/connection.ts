import qrcode from "qrcode-terminal";
import { PrivadoEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

/**
 * Create a connection invitation for a tenant, display a QR code for the invitation,
 * wait for the connection to be accepted, and return the established connection record.
 *
 * This function:
 * - Calls the PrivadoEcosystem client's createConnectionInvitation for the provided tenantId.
 * - Generates and displays a QR code for the returned invitation (user should accept within ~2 minutes).
 * - Polls/waits for the connection to be established via an internal checkConnectionStatus call.
 * - Returns the first connection record from the checkConnectionStatus response when established.
 *
 * @param tenantId - The tenant identifier for which the connection invitation will be created.
 * @param client - An instance of PrivadoEcosystem used to create the invitation and query status.
 * @param label - Optional human-readable label for the connection invitation. Defaults to "Your Connection Label".
 *
 * @returns A promise that resolves to the established connection record (the first entry of the status response).
 *
 * @throws {Error} If the createConnectionInvitation call fails (result.success is falsy). The thrown error contains the underlying result.message.
 * @throws {Error} If the underlying client or the status-checking logic encounters an error or the connection cannot be established.
 *
 */
export const createConnection = async (
  tenantId: string,
  client: InstanceType<typeof PrivadoEcosystem>,
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
 * Polls the connection status for a given invitation until it reaches "completed" or a timeout occurs.
 *
 * @param tenantId - Tenant identifier used to scope the connection lookup.
 * @param invitationId - Invitation identifier for the connection to check.
 * @param client - An instance of PrivadoEcosystem used to call getConnectionById.
 * @returns A Promise that resolves with the underlying API result when the connection state becomes "completed".
 *          The resolved value is the raw result returned by client.getConnectionById.
 * @throws Will reject the returned Promise if an error is thrown while querying the connection,
 *         or if the connection does not reach "completed" within the timeout period.
 * @remarks
 * - The function polls every 5 seconds and will attempt up to 24 polls (total timeout 120 seconds).
 * - On each poll it calls client.getConnectionById({ tenantId, invitationId }) and checks
 *   whether result.response[0].state === "completed".
 * - If an error occurs during polling the interval is cleared and the Promise is rejected.
 * - Errors are logged to the console via console.log before rejection.
 * @example
 * const result = await checkConnectionStatus('tenantA', 'invite123', privadoClient);
 */
export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string,
  client: InstanceType<typeof PrivadoEcosystem>
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
