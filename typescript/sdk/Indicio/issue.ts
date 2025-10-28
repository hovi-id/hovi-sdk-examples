import { IndicioEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "..";
/**
 * Create and send a credential offer for a given tenant using the provided Indicio client.
 *
 * The function delegates to the appropriate client method based on the credential `format`:
 * - "jsonld"  -> client.offerCredentialJsonld
 * - "anoncred" -> client.offerCredentialAnoncreds
 *
 * The request is constructed by combining the provided `tenantId` with the fields in `payload`.
 * On success the function logs a confirmation message to the console. The function is asynchronous
 * and resolves when the request completes; it does not return a value.
 *
 * @remarks
 * - The `payload` shape is forwarded directly to the underlying client method; ensure it contains
 *   the fields expected by the Indicio SDK for the chosen format.
 * - The function expects the client response to include a `success` boolean. If `success` is falsy,
 *   the function throws an Error with the response serialized as the message.
 *
 * @param tenantId - The tenant identifier under which the credential offer should be created/sent.
 * @param payload - An opaque payload object containing request-specific properties for the offer. It
 *                  is spread into the client call along with `tenantId`.
 * @param format - The credential format to issue. Supported values: "jsonld" | "anoncred".
 * @param client - An instance of the IndicioEcosystem client used to perform the credential offer call.
 *
 * @throws {Error} If an unsupported `format` is provided.
 * @throws {Error} If the underlying client call returns a result where `success` is falsy. The thrown
 *                 Error message will contain the returned result.
 *
 * @returns Promise<void> A promise that resolves when the offer call completes successfully.

 */
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
  console.log("✅ Credential offer sent successfully");
}
