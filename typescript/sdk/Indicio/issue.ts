import { IndicioEcosystem } from "@hovi/core-sdk";

export async function offerCredentialJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
) {
  const result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string); // Using message instead of stringified result
  }
  console.log("✅ JSON-LD Credential offer sent successfully");
}

// New, Direct function for Anoncred offers
export async function offerCredentialAnoncred(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof IndicioEcosystem>
) {
  const result: any = await client.offerCredentialAnoncreds({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string); // Using message instead of stringified result
  }
  console.log("✅ Anoncred Credential offer sent successfully");
}
