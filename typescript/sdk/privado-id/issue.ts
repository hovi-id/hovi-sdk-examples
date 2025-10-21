import { PrivadoEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "../types";
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    throw new Error(result as string);
  }
  console.log("✅ Credential offer sent successfully", result);
}
