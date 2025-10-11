import {
  CreateCredentialTemplateAnoncredsRequest,
  CreateCredentialTemplateJsonldRequest,
  CreateCredentialTemplateMdocRequest,
  CreateCredentialTemplateSdJwtRequest,
  CreateTenantRequest,
  CreateVerificationTemplateJsonldRequest,
  CreateVerificationTemplateMdocRequest,
  CreateVerificationTemplateSdJwtRequest,
} from "@hovi/core-sdk/dist/src/ecosystems/types";

import {
  TCredentialFormat,
  TCredentialTemplatePayload,
  TEcosystem,
  TVerificationTemplatePayload,
} from "./types";
import { initClient } from "./initClient";
import logger from "./logger";
import {
  CheqdEcosystem,
  IndicioEcosystem,
  OpenIdEcosystem,
  PrivadoEcosystem,
} from "@hovi/core-sdk";
import { isInstanceOfEcosystem } from "./utils";

export const createTenantHelper = async (
  ecosystem?: TEcosystem,
  payload?: CreateTenantRequest
) => {
  // console.log(payload);
  logger.info("Creating tenant...");
  const { client, ecosystem: ecosystemName } = await initClient(
    ecosystem || "OpenID"
  );
  const defaultPayload: CreateTenantRequest = {
    tenantName: "Hovi Test Tenant",
    tenantLabel: "Hovi SDK Tenant",
    tenantSecret: "hoviSuperSecret1234",
    imageUrl:
      "https://media.licdn.com/dms/image/sync/v2/D4D27AQGlBnOs8wrSFg/articleshare-shrink_800/articleshare-shrink_800/0/1738769764375?e=2147483647&v=beta&t=iD0DEcylpkrJBHyY9JPj50xk4CLFadEnxJwZZ0Vkf80s",
  };
  const result = await client.createTenant(payload || defaultPayload);
  logger.success("✅ Tenant created successfully");
  console.log("Tenant result ", result);
  return { client, result, ecosystemName };
};

export const createCredentialTemplateHelper = async (
  credentialType?: TCredentialFormat,
  payload?: TCredentialTemplatePayload,
  verificationPayload?: TVerificationTemplatePayload
) => {
  const {
    client,
    result: tenantResult,
    ecosystemName,
  } = await createTenantHelper();
  const defaultPayload: CreateCredentialTemplateJsonldRequest = {
    tenantId: tenantResult?.response?.tenantId!,
    name: "Credential Template SDK",
    version: "1.2.3",
    description: "Credential Template created via Hovi SDK",
    schemaType: "Json-LD",
    attributes: [
      {
        name: "firstName",
        label: "First Name",
        type: "string",
        description: "First Name of the user",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "string",
        description: "Last Name of the user",
        required: true,
      },
    ],
  };
  let result;

  if (credentialType && payload) {
    if (
      credentialType === "Json-LD" &&
      isInstanceOfEcosystem(ecosystemName, client)
    ) {
      result = await client.createCredentialTemplateJsonld(
        payload as CreateCredentialTemplateJsonldRequest
      );
    }
    if (credentialType === "SD-JWT" && client instanceof OpenIdEcosystem) {
      result = await client.createCredentialTemplateSdJwt(
        payload as CreateCredentialTemplateSdJwtRequest
      );
    }
    if (credentialType === "Mdoc" && client instanceof OpenIdEcosystem) {
      result = await client.createCredentialTemplateMdoc(
        payload as CreateCredentialTemplateMdocRequest
      );
    }
    if (credentialType === "Anoncreds") {
      if (client instanceof IndicioEcosystem) {
        result = await client.createCredentialTemplateAnoncreds(
          payload as CreateCredentialTemplateAnoncredsRequest
        );
      }
      if (client instanceof CheqdEcosystem) {
        result = await client.createCredentialTemplateAnoncreds(
          payload as CreateCredentialTemplateAnoncredsRequest
        );
      }
    }
  } else {
    credentialType = "Json-LD";
    result = await client.createCredentialTemplateJsonld(
      defaultPayload as CreateCredentialTemplateJsonldRequest
    );
  }
  // Create Verification Template
  await createVerificationTemplateHelper(
    tenantResult?.response?.tenantId!,
    result?.credentialTemplateId!,
    credentialType,
    verificationPayload,
    client as OpenIdEcosystem,
    client as PrivadoEcosystem | IndicioEcosystem | CheqdEcosystem,
    ecosystemName
  );

  return { result, credentialType, ecosystemName, client };
};

export const createVerificationTemplateHelper = async (
  tenantId: string,
  credentialTemplateId: string,
  credentialType?: TCredentialFormat,
  payload?: TVerificationTemplatePayload,
  client?: OpenIdEcosystem,
  client_2?: PrivadoEcosystem | IndicioEcosystem | CheqdEcosystem,
  ecosystemName?: TEcosystem
) => {
  let result;
  const defaultPayload: CreateVerificationTemplateJsonldRequest = {
    tenantId,
    name: "Verification Template SDK",
    version: "1.0.0",
    description: "Verification Template created via Hovi SDK",
    restrictions: {
      credentialTemplateId,
    },
    requestedAttributes: [
      {
        name: "firstName",
        label: "First Name",
        description: "First Name of the user",
        required: true,
        type: "string",
      },
    ],
  };
  if (credentialType && payload) {
    if (
      credentialType === "Json-LD" &&
      ["OpenID", "Privado", "Indicio", "Cheqd"].includes(ecosystemName!)
    ) {
      if (client instanceof OpenIdEcosystem) {
        result = await client!.createVerificationTemplateJsonld(
          payload as CreateVerificationTemplateJsonldRequest
        );
      }
      if (isInstanceOfEcosystem(ecosystemName!, client_2)) {
        result = await client_2!.createVerificationTemplateJsonldRequest(
          payload as CreateVerificationTemplateJsonldRequest
        );
      }
    }
    if (credentialType === "SD-JWT" && client instanceof OpenIdEcosystem) {
      result = await client.createVerificationTemplateSdJwt(
        payload as CreateVerificationTemplateSdJwtRequest
      );
    }
    if (credentialType === "Mdoc" && client instanceof OpenIdEcosystem) {
      result = await client.createVerificationTemplateMdoc(
        payload as CreateVerificationTemplateMdocRequest
      );
    }
    if (credentialType === "Anoncreds") {
      if (client instanceof IndicioEcosystem) {
        result = await client.createVerificationTemplateAnoncreds(
          payload as CreateCredentialTemplateAnoncredsRequest
        );
      }
      if (client instanceof CheqdEcosystem) {
        result = await client.createVerificationTemplateAnoncreds(
          payload as CreateCredentialTemplateAnoncredsRequest
        );
      }
    }
  } else {
    if (client instanceof OpenIdEcosystem) {
      result = await client.createVerificationTemplateJsonld(
        defaultPayload as CreateVerificationTemplateJsonldRequest
      );
    }
  }
  logger.info("Verification Template response", result);
  // console.log(credentialType, payload);
};
