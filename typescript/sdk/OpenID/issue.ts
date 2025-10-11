import {
  CheqdEcosystem,
  IndicioEcosystem,
  OpenIdEcosystem,
  PrivadoEcosystem,
} from "@hovi/core-sdk";
import {} from "@hovi/cloudwallet-sdk";
import { createCredentialTemplateHelper } from "../utils/helper";
import logger from "../utils/logger";
import { isInstanceOfEcosystem } from "../utils/utils";

export const issueCredential = async () => {
  const defaultPayload = {
    firstName: "John",
    lastName: "Doe",
  };
  // tenantId: string;
  //   credentialTemplateId: string;
  //   connectionId?: string;
  //   credentialValues: CredentialValue;
  //   holderDid?: string;
  //   comment?: string;
  //   codeflow?: string;
  //   preAuthorizedCodeflowConfig?: {
  //       useTransactionCode?: boolean;
  //       transactionCode?: {
  //           description?: string;
  //           length?: number;
  //       };
  //   };
  const { client, result, ecosystemName, credentialType } =
    await createCredentialTemplateHelper();
  let issueCredentialResponse;
  const credentialTemplateResponse = result?.response;
  // console.log({
  //   client,
  //   result,
  //   ecosystemName,
  //   credentialType,
  // });
  if (credentialType && result && client && ecosystemName) {
    if (
      credentialType === "Json-LD" &&
      ["OpenID", "Privado", "Indicio", "Cheqd"].includes(ecosystemName)
    ) {
      if (isInstanceOfEcosystem(ecosystemName, client)) {
        issueCredentialResponse = await client.offerCredentialJsonld({
          tenantId: credentialTemplateResponse?.tenantId,
          credentialTemplateId:
            credentialTemplateResponse?.credentialTemplateId,
          credentialValues: defaultPayload,
          connectionId: ecosystemName === "OpenID" ? undefined : undefined,
        });
      }
    }
    if (
      credentialType === "SD-JWT" &&
      ecosystemName === "OpenID" &&
      client instanceof OpenIdEcosystem
    ) {
      issueCredentialResponse = await client.offerCredentialSdJwt({
        tenantId: credentialTemplateResponse?.tenantId,
        credentialTemplateId: credentialTemplateResponse?.credentialTemplateId,
        credentialValues: defaultPayload,
      });
    }
    if (
      credentialType === "Mdoc" &&
      ecosystemName === "OpenID" &&
      client instanceof OpenIdEcosystem
    ) {
      issueCredentialResponse = await client.offerCredentialMdoc({
        tenantId: credentialTemplateResponse?.tenantId,
        credentialTemplateId: credentialTemplateResponse?.credentialTemplateId,
        credentialValues: defaultPayload,
      });
    }
    if (credentialType === "Anoncreds") {
      if (client instanceof IndicioEcosystem) {
        issueCredentialResponse = await client.offerCredentialAnoncreds({
          tenantId: credentialTemplateResponse?.tenantId,
          credentialTemplateId:
            credentialTemplateResponse?.credentialTemplateId,
          credentialValues: defaultPayload,
          connectionId: "",
        });
      }
      if (client instanceof CheqdEcosystem) {
        issueCredentialResponse = await client.offerCredentialAnoncreds({
          tenantId: credentialTemplateResponse?.tenantId,
          credentialTemplateId:
            credentialTemplateResponse?.credentialTemplateId,
          credentialValues: defaultPayload,
          connectionId: "",
        });
      }
    }
  } else {
    logger.error("❌ Missing required data to issue credential");
    return;
  }
  logger.info("✅ Credential Issued Successfully");
  logger.info("Issue Credential Response:", issueCredentialResponse);
  return issueCredentialResponse;
};
