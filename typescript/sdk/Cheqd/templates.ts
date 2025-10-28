import chalk from "chalk";
import { CheqdEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "..";
/**
 * Create a credential template for a tenant using the Cheqd ecosystem client.
 *
 * The function delegates creation to the appropriate client method based on the
 * provided credential format. Supported formats:
 * - "jsonld"   -> uses client.createCredentialTemplateJsonld
 * - "anoncred" -> uses client.createCredentialTemplateAnoncreds
 *
 * Side effects:
 * - Logs success or failure messages to the console.
 *
 * @param tenantId - The identifier of the tenant under which the credential template will be created.
 * @param payload - The payload specific to the credential template. Its shape depends on the chosen format.
 * @param format - The credential format to create ("jsonld" | "anoncred").
 * @param client - An initialized instance of the CheqdEcosystem client used to perform the creation request.
 *
 * @returns A promise that resolves to the raw result returned by the client API. The result is expected to
 * include a `success` boolean and additional metadata or error `message`.
 *
 * @throws {Error} If the provided `format` is unsupported.
 * @throws {Error} If the client call does not succeed (result.success is falsy). The error message contains
 * the `result.message` from the client response.
 */
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof CheqdEcosystem>
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
 * Creates a verification template for a tenant using the provided Cheqd ecosystem client.
 *
 * This asynchronous helper delegates to the appropriate client method based on the supplied
 * credential format. Supported formats:
 * - "jsonld"   -> client.createVerificationTemplateJsonldRequest
 * - "anoncred" -> client.createVerificationTemplateAnoncreds
 *
 * The function will log success or failure to the console and return the raw result from the
 * underlying client call.
 *
 * @param tenantId - The identifier of the tenant for which the verification template will be created.
 * @param payload - The request payload to send to the client. Its expected shape depends on the chosen format;
 *                  the helper will merge the tenantId into this payload before sending.
 * @param format - The credential format to use when creating the verification template (TCredentialFormat).
 * @param client - An instance of the CheqdEcosystem client used to perform the network request.
 *
 * @returns A promise that resolves to the raw result returned by the underlying client method.
 *          The result is expected to include a `success` boolean; when `true`, the creation succeeded.
 *
 * @throws {Error} When an unsupported credential format is provided.
 * @throws {Error} When the client call returns a result with a falsy `success` value; the function logs
 *                 the failure and then throws an error containing the result.
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof CheqdEcosystem>
) => {
  let result: any;
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
    throw new Error(result.message as string);
  }
  console.log("✅ Verification template created successfully", result);
  return result;
};
