import type { CloudWallet } from "@hovi/cloudwallet-sdk";
import { createCredentialTemplateHelper } from "../utils/helper";
import logger from "../utils/logger";

export const recieveCredential = async (
  credentialOfferUri: string,
  credentialId: string,
  wallet: CloudWallet
) => {
  //  protocol: string;
  //   credentialOfferUri?: string | undefined;
  //   credentialId?: string | undefined;
  logger.info("📥 Incoming Credential...");
  const previewResponse = await wallet.previewCredentialOffer({
    credentialId,
    credentialOfferUri,
    protocol: "openid",
  });
  logger.info("Preview Response:", previewResponse);
  logger.info("Accepting Credential...");
  const recieveCredentialResponse = await wallet.acceptCredentialOffer({
    credentialId,
    credentialOfferUri,
    protocol: "openid",
  });
  console.log("Recieve Credential Response:", recieveCredentialResponse);
  logger.success("✅ Credential received successfully");
};
