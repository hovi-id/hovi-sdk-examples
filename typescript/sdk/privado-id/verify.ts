import { PrivadoEcosystem } from "@hovi/core-sdk";

export const sendProofRequest = async (
  tenantId: string,
  /**
   * Sends a verification proof request for a tenant using the provided PrivadoEcosystem client.
   *
   * This function calls the client's sendProofRequest API with the given tenant ID,
   * verification template ID, and connection ID. If the client's response indicates
   * failure, the function throws an Error with the returned message. On success, it
   * logs the successful result to the console.
   *
   * @param tenantId - The identifier of the tenant for which the proof request should be sent.
   * @param verificationTemplateId - The identifier of the verification template to use for the proof request.
   * @param connectionId - The connection identifier representing the recipient of the proof request.
   * @param client - An instance of PrivadoEcosystem used to perform the sendProofRequest operation.
   *
   * @throws {Error} If the underlying client returns a non-success response; the thrown error's message
   *                 contains the client's failure message.
   *
   * @returns A promise that resolves when the proof request has been sent successfully.
   */
  verificationTemplateId: string,
  connectionId: string,
  client: InstanceType<typeof PrivadoEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
    connectionId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("Verification proof request sent");
};
