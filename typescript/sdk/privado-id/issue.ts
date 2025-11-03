import { PrivadoEcosystem } from "@hovi/core-sdk";

export async function offerCredentialJsonLd( // Renamed function
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    // Use result.message instead of casting the whole result object to string
    throw new Error(result.message as string);
  }
  console.log("✅ Credential offer sent successfully");
}
