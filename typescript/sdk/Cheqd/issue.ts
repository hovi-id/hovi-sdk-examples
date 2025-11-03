import { CheqdEcosystem } from "@hovi/core-sdk";

export async function offerCredentialJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof CheqdEcosystem>
) {
  const result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ JSON-LD Credential offer sent successfully");
}

export async function offerCredentialAnoncred(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof CheqdEcosystem>
) {
  const result: any = await client.offerCredentialAnoncreds({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ Anoncred Credential offer sent successfully");
}
