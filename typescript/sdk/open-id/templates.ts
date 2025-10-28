import { OpenIdEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "..";
/**
 * Create a credential template for a given tenant using the provided OpenIdEcosystem client.
 *
 * The function delegates to one of the client's template creation methods based on the
 * requested credential format:
 * - "jsonld"  -> client.createCredentialTemplateJsonld
 * - "sd-jwt"  -> client.createCredentialTemplateSdJwt
 * - "mdoc"    -> client.createCredentialTemplateMdoc
 *
 * The tenantId is merged into the provided payload before calling the client.
 *
 * Side effects:
 * - Logs a success message to the console on success.
 * - Logs a red error message (using chalk) and throws if the client reports failure.
 *
 * @param tenantId - Identifier of the tenant for which the credential template will be created.
 * @param payload - Payload object containing the template data. This will be shallow-merged with { tenantId }.
 * @param format - Credential format to create. Supported values: "jsonld", "sd-jwt", "mdoc".
 * @param client - An instance of OpenIdEcosystem that exposes the required createCredentialTemplate* methods.
 *
 * @returns A promise that resolves with the raw result returned by the client when creation succeeds.
 *
 * @throws {Error} If an unsupported credential format is provided.
 * @throws {Error} If the client returns a falsy `result.success` (the client's `result.message` will be included).
 */
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  let result;
  switch (format) {
    case "jsonld": {
      result = await client.createCredentialTemplateJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "sd-jwt": {
      result = await client.createCredentialTemplateSdJwt({
        tenantId,
        ...payload,
      });
      break;
    }
    case "mdoc": {
      result = await client.createCredentialTemplateMdoc({
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
 * Creates a verification template for a tenant using the specified credential format.
 *
 * The function dispatches to the appropriate OpenIdEcosystem client method based on `format`:
 * - "jsonld"  -> client.createVerificationTemplateJsonld
 * - "sd-jwt"  -> client.createVerificationTemplateSdJwt
 * - "mdoc"    -> client.createVerificationTemplateMdoc
 *
 * @param tenantId - The tenant identifier that the template will belong to.
 * @param payload - Template payload (merged into the client's request). Shape is passed through to the client API.
 * @param format - Credential format to use for the template (e.g. "jsonld", "sd-jwt", "mdoc").
 * @param client - An instance of OpenIdEcosystem used to perform the API call.
 *
 * @returns A promise that resolves with the raw result returned by the client when creation succeeds.
 *
 * @throws {Error} If the provided `format` is unsupported, or if the client response indicates failure
 *                 (the function expects a `success` boolean on the returned result and will throw when false).
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  let result;
  switch (format) {
    case "jsonld": {
      result = await client.createVerificationTemplateJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "sd-jwt": {
      result = await client.createVerificationTemplateSdJwt({
        tenantId,
        ...payload,
      });
      break;
    }
    case "mdoc": {
      result = await client.createVerificationTemplateMdoc({
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
