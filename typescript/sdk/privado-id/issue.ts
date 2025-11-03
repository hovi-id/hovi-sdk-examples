import { PrivadoEcosystem } from "@hovi/core-sdk";

export async function offerCredentialJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ Credential offer sent successfully");
}
