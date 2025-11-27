// typescript/sdk/Cheqd/templates.ts (Refactored)

import chalk from "chalk";
import { IndicioEcosystem } from "@hovi/core-sdk";

export async function createCredentialTemplateJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
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

export async function createCredentialTemplateAnoncred(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
) {
  const result: any = await client.createCredentialTemplateAnoncreds({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ Anoncred Credential template created successfully");
  return result;
}

export const createVerificationTemplateJsonLd = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
) => {
  const result: any = await client.createVerificationTemplateJsonldRequest({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ JSON-LD Verification template created successfully", result);
  return result;
};

export const createVerificationTemplateAnoncred = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
) => {
  const result: any = await client.createVerificationTemplateAnoncreds({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ Anoncred Verification template created successfully", result);
  return result;
};
