import qrcode from "qrcode-terminal";
import { CheqdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

/**
 * Sends a verification proof request using the Cheqd ecosystem client.
 *
 * Initiates a proof request for a given tenant using the specified verification template,
 * targeting the provided connection. On success, the function logs the result to the console.
 *
 * @param tenantId - The tenant identifier on whose behalf the proof request is issued.
 * @param verificationTemplateId - The identifier of the verification template to use.
 * @param connectionId - The connection identifier of the recipient to which the proof request will be sent.
 * @param client - An initialized CheqdEcosystem client instance used to perform the operation.
 *
 * @returns A promise that resolves when the proof request has been successfully sent.
 *
 * @throws {Error} If the client operation reports failure (`result.success` is false). The thrown error's
 * message contains the failure reason returned by the client.
 */
export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId: string,
  client: InstanceType<typeof CheqdEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
    connectionId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("Verification proof request sent", result);
};
