import { PrivadoEcosystem } from "@hovi/core-sdk";
/**
 * Create and send a credential offer to a tenant via the PrivadoEcosystem client.
 *
 * Calls client.offerCredentialJsonld with the provided tenantId and payload, verifies the
 * response and logs a success message. If the underlying call indicates failure, this
 * function throws an Error.
 *
 * @param tenantId - The identifier of the tenant to which the credential offer will be sent.
 * @param payload - The request payload that will be forwarded to client.offerCredentialJsonld.
 *                  Expected shape depends on the PrivadoEcosystem API for credential offers.
 * @param format - The credential format to be used for the offer. Present for API compatibility;
 *                 note that this parameter is not used by the current implementation.
 * @param client - An initialized instance of PrivadoEcosystem used to perform the offer request.
 *
 * @returns A Promise that resolves to void when the offer is sent successfully.
 *
 * @throws {Error} When the call to client.offerCredentialJsonld returns a non-success result.
 *                 The thrown error will contain the stringified result from the client call.
 *
 * @remarks
 * - On success, a console.log call indicates the offer was sent and prints the raw result.
 * - The function expects the client response to include a boolean `success` property.
 */
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    throw new Error(result as string);
  }
  console.log("✅ Credential offer sent successfully");
}
