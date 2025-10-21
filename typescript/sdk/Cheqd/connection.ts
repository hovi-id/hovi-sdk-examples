import qrcode from "qrcode-terminal";
import { CheqdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

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
