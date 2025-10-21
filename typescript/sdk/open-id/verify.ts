import qrcode from "qrcode-terminal";
import { CloudWallet } from "@hovi/cloudwallet-sdk";
import { OpenIdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("Verification proof request sent", result);
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.authorizationRequestUri, { small: true });
};
