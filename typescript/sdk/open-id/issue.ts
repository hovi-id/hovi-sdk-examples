import qrcode from "qrcode-terminal";
// ... imports
// import { TCredentialFormat } from ".."; // Not needed anymore!

import { OpenIdEcosystem } from "@hovi/core-sdk";
import chalk from "chalk";

// New, Direct function for SD-JWT offers
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

// New, Direct function for JSON-LD offers
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

// New, Direct function for mDoc offers
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
