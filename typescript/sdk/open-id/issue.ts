import { OpenIdEcosystem } from "@hovi/core-sdk";
import { TCredentialFormat } from "../types";
import chalk from "chalk";
import qrcode from "qrcode-terminal";
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
    throw new Error(result as string);
  }
  console.log("✅ Credential offer created successfully", result);
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.credentialOfferUri, { small: true });
}
