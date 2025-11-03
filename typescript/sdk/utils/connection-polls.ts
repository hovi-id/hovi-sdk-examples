// FILE: typescript/sdk/utils/connection-poll.ts (New Generic Utility)

/**
 * Defines the minimum required client interface for connection status polling.
 * This is a trick to make the polling logic reusable for Cheqd, Indicio, and Privado.
 */
interface IConnectionPollingClient {
  getConnectionById: (params: {
    tenantId: string;
    invitationId: string;
  }) => Promise<any>;
}

/**
 * Polls a connection until it reaches the "completed" state or a timeout occurs.
 * This function is now generic and reusable across all ecosystems.
 * * @param tenantId The tenant identifier.
 * @param invitationId The invitation identifier corresponding to the connection.
 * @param client An ecosystem client instance that implements getConnectionById.
 * @returns A Promise that resolves with the result object when the connection reaches state "completed".
 */
export const checkConnectionStatus = async (
  tenantId: string,
  invitationId: string,
  client: IConnectionPollingClient // Generic client type
) => {
  let pollCount = 0;
  return new Promise<any>((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Timeout after 24 attempts (approx 120 seconds)
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
