import { CheqdEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "..";
/**
 * Create and send a credential offer for a tenant using the provided CHEQD client.
 *
 * The function dispatches to the appropriate client method based on the credential
 * `format`:
 * - `"jsonld"` -> `client.offerCredentialJsonld`
 * - `"anoncred"` -> `client.offerCredentialAnoncreds`
 *
 * On success the function logs a confirmation message. If the format is not
 * supported or the client call indicates failure, the function throws.
 *
 * @param tenantId - The identifier of the tenant issuing the credential.
 * @param payload - The credential offer payload (shape depends on the chosen format).
 * @param format - The credential format to use (`TCredentialFormat`, e.g. `"jsonld"` or `"anoncred"`).
 * @param client - An instance of `CheqdEcosystem` used to perform the offer operation.
 *
 * @returns A Promise that resolves when the offer has been sent successfully.
 *
 * @throws {Error} If `format` is unsupported (message: `Unsupported credential format: ${format}`).
 * @throws {Error} If the client call returns a non-success result (the thrown error will contain the client's result string).
 **/
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof CheqdEcosystem>
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
    throw new Error(result.message as string);
  }
  console.log("✅ Credential offer sent successfully");
}
