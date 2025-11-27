import qrcode from "qrcode-terminal";
import { OpenIdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

/**
 * Sends a proof (verification) request for a given tenant using the provided OpenID ecosystem client,
 * and outputs a QR code that can be scanned to complete the authorization flow.
 *
 * The function:
 * - Calls `client.sendProofRequest({ tenantId, verificationTemplateId })`.
 * - Throws an Error when the returned `result.success` is falsy, using `result.message` as the error message.
 * - Logs a success message to the console when the request succeeds.
 * - Generates and prints a QR code for `result.response.authorizationRequestUri` (if present) using `qrcode.generate`.
 *
 * @remarks
 * The `client` parameter is expected to be an instance of an OpenID ecosystem client exposing a
 * `sendProofRequest` method that returns a result object shaped approximately like:
 * `{ success: boolean, message?: string, response?: { authorizationRequestUri?: string } }`.
 *
 * The function has side effects: it writes to stdout (console logs) and generates a QR code to the terminal.
 *
 * @param tenantId - Identifier of the tenant for which to send the proof request.
 * @param verificationTemplateId - Identifier of the verification template to use for the proof request.
 * @param client - An instance of the OpenID ecosystem client used to perform the request. Must implement
 *                 `sendProofRequest` and return a result object with `success`, optional `message`, and optional `response`.
 *
 * @returns A promise that resolves to void when the request completes and the QR code (if any) has been printed.
 *
 * @throws {Error} If the proof request operation is not successful (i.e., `result.success` is falsy).

 */
export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("Verification proof request sent");
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.authorizationRequestUri, { small: true });
};
