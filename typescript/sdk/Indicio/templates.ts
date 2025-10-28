import { IndicioEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "..";
/**
 * Create a credential template for a tenant using the provided Indicio ecosystem client.
 *
 * This function delegates the creation to the appropriate client method based on the
 * requested credential format:
 * - "jsonld"  -> calls `client.createCredentialTemplateJsonld`
 * - "anoncred" -> calls `client.createCredentialTemplateAnoncreds`
 *
 * The `tenantId` is merged into the payload before sending to the client. The returned
 * `result` is logged to the console on success, and an error (with the result message)
 * is thrown if the client indicates failure.
 *
 * Side effects:
 * - Performs a network/API call via the provided `client`.
 * - Writes to the console using `console.log` and `chalk`.
 *
 * @param tenantId - The identifier of the tenant for which the credential template is created.
 * @param payload - Payload object with template details. Its exact shape depends on the chosen `format`.
 *                  The function spreads this payload and injects the `tenantId` before calling the client.
 * @param format - Credential format to create. Supported values: `"jsonld"` and `"anoncred"`.
 * @param client - An instance of `IndicioEcosystem` providing the methods:
 *                 `createCredentialTemplateJsonld` and `createCredentialTemplateAnoncreds`.
 *
 * @returns A promise that resolves to the raw `result` returned by the client (type: any).
 *          The `result` is expected to contain at least a `success: boolean` flag and a `message: string`.
 *
 * @throws Will throw an Error if:
 *   - `format` is unsupported.
 *   - the client call returns a result where `result.success` is falsy (the error message will be `result.message`).
 */
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof IndicioEcosystem>
) {
  let result: any;
  switch (format) {
    case "jsonld": {
      result = await client.createCredentialTemplateJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "anoncred": {
      result = await client.createCredentialTemplateAnoncreds({
        tenantId,
        ...payload,
      });
      break;
    }

    default:
      throw new Error(`Unsupported credential format: ${format}`);
  }
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ Credential template created successfully");
  return result;
}

/**
 * Creates a verification template for a tenant using the provided IndicioEcosystem client.
 *
 * This function selects the appropriate client method based on the requested credential
 * format and forwards the tenantId plus payload to that method:
 * - "jsonld"   -> client.createVerificationTemplateJsonldRequest
 * - "anoncred" -> client.createVerificationTemplateAnoncreds
 *
 * The function logs success or failure to the console and returns the raw result object
 * returned by the client call.
 *
 * @param tenantId - The identifier of the tenant for which to create the verification template.
 * @param payload - The payload to forward to the client's creation method (shape depends on format).
 * @param format - Credential format to use when creating the template. Supported values: "jsonld" | "anoncred".
 * @param client - An instance of IndicioEcosystem used to perform the API request.
 *
 * @returns A Promise that resolves to the client result object when the creation succeeds.
 *
 * @throws {Error} If an unsupported credential format is provided, or if the client returns a failed result.
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof IndicioEcosystem>
) => {
  let result;
  switch (format) {
    case "jsonld": {
      result = await client.createVerificationTemplateJsonldRequest({
        tenantId,
        ...payload,
      });
      break;
    }
    case "anoncred": {
      result = await client.createVerificationTemplateAnoncreds({
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
  console.log("✅ Verification template created successfully");
  return result;
};
