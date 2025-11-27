// FILE: typescript/sdk/privado-id/templates.ts (Refactored for Simplicity)

import { PrivadoEcosystem } from "@hovi/core-sdk";

/**
 * Creates a JSON-LD credential template for a tenant.
 */
export async function createCredentialTemplateJsonLd( 
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.createCredentialTemplateJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    // Clean up redundant console.log before throw
    throw new Error(result.message);
  }
  console.log("✅ JSON-LD Credential template created successfully");
  return result;
}

/**
 * Creates a JSON-LD verification template for a tenant.
 */
export const createVerificationTemplateJsonLd = async (
  // Explicit function name
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) => {
  let result: any = await client.createVerificationTemplateJsonldRequest({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ JSON-LD Verification template created successfully");
  return result;
};
