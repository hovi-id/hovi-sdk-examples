import qrcode from "qrcode-terminal";
import { IndicioEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";
import { checkConnectionStatus } from "../utils/connection-polls";

/**
 * Creates a connection invitation, displays a QR code, and waits for connection completion.
 * Note: checkConnectionStatus is now imported and reused.
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
  console.log(
    chalk.green(
      `Accept the connection request using the QR code above in next 2 min otherwise you will have to create the connection again.`
    )
  );
  const connectionStatus = await checkConnectionStatus(
    // Use the generic function
    tenantId,
    result?.response?.invitationId!,
    client // Pass the client instance
  );
  console.log(chalk.green("Connection established!"));
  return connectionStatus.response[0];
};
