import { IndicioEcosystem } from "@hovi/core-sdk";

/**
 * Sends a verification proof request to a connection using the provided IndicioEcosystem client.
 *
 * @remarks
 * Calls the client's sendProofRequest with the provided tenantId, verificationTemplateId, and connectionId.
 * If the underlying call indicates failure (result.success is falsy), this function throws an Error with the
 * result's message. On success, an informational message is logged to the console.
 *
 * @param tenantId - The tenant identifier under which the verification request should be issued.
 * @param verificationTemplateId - The identifier of the verification template to use for the proof request.
 * @param connectionId - The identifier of the connection to which the proof request will be sent.
 * @param client - An instance of IndicioEcosystem used to perform the sendProofRequest operation.
 *
 * @returns A Promise that resolves to void when the request is successfully sent.
 *
 * @throws {Error} If the client's sendProofRequest returns an unsuccessful result, an Error is thrown with the result message.
 * The function may also propagate other errors from the client (e.g., network or runtime errors).
 * */
export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId: string,
  client: InstanceType<typeof IndicioEcosystem>
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
