
import { OpenIdEcosystem } from "@hovi/core-sdk";

export async function createCredentialTemplateJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.createCredentialTemplateJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ JSON-LD Credential template created successfully");
  return result;
}

export async function createCredentialTemplateSdJwt(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.createCredentialTemplateSdJwt({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ SD-JWT Credential template created successfully");
  return result;
}

export async function createCredentialTemplateMdoc(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.createCredentialTemplateMdoc({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ mDoc Credential template created successfully");
  return result;
}


export const createVerificationTemplateJsonLd = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  const result: any = await client.createVerificationTemplateJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ JSON-LD Verification template created successfully");
  return result;
};

export const createVerificationTemplateSdJwt = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  const result: any = await client.createVerificationTemplateSdJwt({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ SD-JWT Verification template created successfully");
  return result;
};

export const createVerificationTemplateMdoc = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  const result: any = await client.createVerificationTemplateMdoc({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ mDoc Verification template created successfully");
  return result;
};
