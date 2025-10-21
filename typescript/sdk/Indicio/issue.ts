import { IndicioEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "../types";
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof IndicioEcosystem>
) {
  let result: any;
  switch (format) {
    case "jsonld": {
      result = await client.offerCredentialJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "anoncred": {
      result = await client.offerCredentialAnoncreds({
        tenantId,
        ...payload,
      });
      break;
    }

    default:
      throw new Error(`Unsupported credential format: ${format}`);
  }
  if (!result.success) {
    throw new Error(result as string);
  }
  console.log("✅ Credential offer sent successfully", result);
}
