import qrcode from "qrcode-terminal";

import { OpenIdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

export async function offerCredentialSdJwt(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.offerCredentialSdJwt({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ SD-JWT Credential offer created successfully");
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.credentialOfferUri, { small: true });
}

export async function offerCredentialJsonLd(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.offerCredentialJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ JSON-LD Credential offer created successfully");
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.credentialOfferUri, { small: true });
}

export async function offerCredentialMdoc(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  const result: any = await client.offerCredentialMdoc({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    throw new Error(result.message as string);
  }
  console.log("✅ mDoc Credential offer created successfully");
  console.log(chalk.magentaBright("\n📱 Scan this QR code:\n"));
  qrcode.generate(result?.response?.credentialOfferUri, { small: true });
}
