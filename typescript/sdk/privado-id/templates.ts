import chalk from "chalk";
import { PrivadoEcosystem } from "@hovi/core-sdk";
/**
 * Creates a credential template for a given tenant using the provided PrivadoEcosystem client.
 *
 * This function calls `client.createCredentialTemplateJsonld` with an object that merges the
 * `tenantId` and the provided `payload`. On failure it logs an error message (using `chalk.red`)
 * and throws an Error with the message returned by the client. On success it logs the success and
 * returns the raw result object returned by the client.
 *
 * @param tenantId - The identifier of the tenant under which the credential template will be created.
 * @param payload - An object containing the credential template data to be sent to the API. It will be
 *                  shallow-merged with `{ tenantId }` before being passed to the client method.
 * @param client - An instance of `PrivadoEcosystem` used to perform the creation request. Expected to
 *                 implement `createCredentialTemplateJsonld`.
 *
 * @returns A promise that resolves to the raw result returned by `client.createCredentialTemplateJsonld`.
 *          The exact shape depends on the client's implementation (typed as `any`).
 *
 * @throws {Error} Throws when the client's response has `success` set to a falsy value. The thrown Error's
 *                 message will be the `message` field from the client's result.
 *
 * @remarks
 * - Side effects: logs to console on both success and failure.
 * - The function expects the client call to return an object with at least `{ success: boolean, message?: string }`.
 *
 */
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.createCredentialTemplateJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    console.log(result.message);
    throw new Error(result.message);
  }
  console.log("✅ Credential template created successfully");
  return result;
}

/**
 * Creates a verification template for a tenant using the provided PrivadoEcosystem client.
 *
 * This function forwards the given payload (merged with the tenantId) to the client's
 * createVerificationTemplateJsonldRequest method, verifies the response, logs the result,
 * and returns the full result object on success.
 *
 * @param tenantId - The tenant identifier to associate with the verification template.
 * @param payload - Arbitrary payload to include in the verification template request. It is spread
 *                  into the request body together with the tenantId.
 * @param client - An instance of PrivadoEcosystem that implements createVerificationTemplateJsonldRequest.
 *
 * @returns A Promise that resolves with the result object returned by the client's request method.
 *          The result is expected to contain a boolean `success` flag and any additional data
 *          returned by the backend.
 *
 * @throws Will throw an Error when the client's response indicates failure (result.success is falsy).
 *
 * @remarks
 * - Side effects: logs to console using console.log and chalk.red for errors.
 * - The function assumes the client method returns an object compatible with { success: boolean, ... }.
 */
export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) => {
  let result: any = await client.createVerificationTemplateJsonldRequest({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ Verification template created successfully");
  return result;
};
