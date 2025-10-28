import { OpenIdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";
import qrcode from "qrcode-terminal";
import { TCredentialFormat } from "..";
/**
 * Create a credential offer for a tenant using the specified credential format and OpenIdEcosystem client.
 *
 * This function selects the appropriate client call based on the provided format and forwards the supplied
 * payload (spread into the request) along with the tenantId. On success it logs the result and renders a QR
 * code for the returned credential offer URI. It throws on unsupported formats or when the underlying client
 * reports a non-successful result.
 *
 * @param tenantId - Identifier of the tenant for which the credential offer will be created.
 * @param payload - Payload data for the credential offer; its shape depends on the chosen `format` and the
 *                  expectations of the underlying OpenIdEcosystem methods.
 * @param format - Credential format to issue. Supported values: "jsonld", "sd-jwt", "mdoc".
 * @param client - An instance of OpenIdEcosystem used to make the credential offer API calls. The function
 *                 will call one of: `offerCredentialJsonld`, `offerCredentialSdJwt`, or `offerCredentialMdoc`.
 *
 * @returns A promise that resolves once the offer has been created and the QR code printed. The function
 *          does not return a value on success.
 *
 * @throws {Error} If `format` is not one of the supported values.
 * @throws {Error} If the client call returns a result indicating failure (`result.success` is falsy). The thrown
 *                 error will contain the `result` (cast to string in the implementation).
 * @throws {Error} Any error propagated from the client methods (network, validation, etc.) will bubble up.
 */
export async function createCredentialOffer(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof OpenIdEcosystem>
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
    case "sd-jwt": {
      result = await client.offerCredentialSdJwt({
        tenantId,
        ...payload,
      });
      break;
    }
    case "mdoc": {
      result = await client.offerCredentialMdoc({ tenantId, ...payload });
      break;
    }
    default:
      throw new Error(`Unsupported credential format: ${format}`);
  }
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ Credential offer created successfully");
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.credentialOfferUri, { small: true });
}
