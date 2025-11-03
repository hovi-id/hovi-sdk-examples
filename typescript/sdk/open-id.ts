import { faker } from "@faker-js/faker";
import {
  offerCredentialJsonLd,
  offerCredentialMdoc,
  offerCredentialSdJwt,
} from "./open-id/issue";
import { sendProofRequest } from "./open-id/verify";
import { createTenant } from "./utils/tenant";
import {
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
  openidMdocCredentialTemplate,
  openidMdocVerificationTemplate,
  openidSdJwtCredentialTemplate,
  openidSdJwtVerificationTemplate,
} from "./faker";
import { OpenIdEcosystem } from "@hovi/core-sdk";
import {
  createCredentialTemplateJsonLd,
  createCredentialTemplateMdoc,
  createCredentialTemplateSdJwt,
  createVerificationTemplateJsonLd,
  createVerificationTemplateMdoc,
  createVerificationTemplateSdJwt,
} from "./open-id/templates";
import chalk from "chalk";

export async function openIdSdJwtWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  console.log(chalk.blue.bold("\n--- Starting OpenID SD-JWT Workflow ---")); // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "OpenIdSdJwtIssuer",
      tenantLabel: "SD-JWT Issuer",
      tenantSecret: "sd-jwt-secret",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const tenantId = tenantResponse.response.tenantId; // Step 2: Create a new credential template (SD-JWT)

  const createCredentialTemplateResponse = await createCredentialTemplateSdJwt(
    tenantId,
    openidSdJwtCredentialTemplate,
    client
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;
  console.log(chalk.green(`Template ID: ${credentialTemplateId}`)); // Step 3: Create a new credential offer (SD-JWT) - FULLY ACTIVE

  await offerCredentialSdJwt(
    tenantId,
    {
      credentialTemplateId: credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    client
  ); // Step 4: Create a new verification template (SD-JWT)
  const createVerificationTemplateResponse =
    await createVerificationTemplateSdJwt(
      tenantId,
      {
        ...openidSdJwtVerificationTemplate,
        restrictions: { credentialTemplateId: credentialTemplateId },
      },
      client
    );
  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;
  console.log(
    chalk.green(`Verification Template ID: ${verificationTemplateId}`)
  ); // Step 5: Send a proof request - FULLY ACTIVE

  await sendProofRequest(tenantId, verificationTemplateId, client);
  console.log(chalk.blue.bold("--- OpenID SD-JWT Workflow Complete ---"));
}

/**
 * Executes a full OpenID JSON-LD credential issuance and verification workflow.
 */
export async function openIdJsonLdWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  console.log(chalk.blue.bold("\n--- Starting OpenID JSON-LD Workflow ---")); // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "OpenIdJsonLdIssuer",
      tenantLabel: "JSON-LD Issuer",
      tenantSecret: "json-ld-secret",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const tenantId = tenantResponse.response.tenantId; // Step 2: Create a new credential template (JSON-LD)

  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    tenantId,
    jsonLdCredentialTemplate,
    client
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;
  console.log(chalk.green(`Template ID: ${credentialTemplateId}`)); // Step 3: Create a new credential offer (JSON-LD) - FULLY ACTIVE

  await offerCredentialJsonLd(
    tenantId,
    {
      credentialTemplateId: credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    client
  ); // Step 4: Create a new verification template (JSON-LD)

  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(
      tenantId,
      {
        ...jsonLdVerificationTemplate,
        restrictions: { credentialTemplateId: credentialTemplateId },
      },
      client
    );
  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;
  console.log(
    chalk.green(`Verification Template ID: ${verificationTemplateId}`)
  ); // Step 5: Send a proof request - FULLY ACTIVE

  await sendProofRequest(tenantId, verificationTemplateId, client);
  console.log(chalk.blue.bold("--- OpenID JSON-LD Workflow Complete ---"));
}

/**
 * Executes a full OpenID mDoc credential issuance and verification workflow.
 */
export async function openIDmDocWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  console.log(chalk.blue.bold("\n--- Starting OpenID mDoc Workflow ---")); // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "OpenIdMdocIssuer",
      tenantLabel: "mDoc Issuer",
      tenantSecret: "mdoc-secret",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const tenantId = tenantResponse.response.tenantId; // Step 2: Create a new credential template (mDoc)

  const createCredentialTemplateResponse = await createCredentialTemplateMdoc(
    tenantId,
    openidMdocCredentialTemplate,
    client
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;
  console.log(chalk.green(`Template ID: ${credentialTemplateId}`)); // Step 3: Create a new credential offer (mDoc) - FULLY ACTIVE

  await offerCredentialMdoc(
    tenantId,
    {
      credentialTemplateId: credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    client
  ); // Step 4: Create a new verification template (mDoc)

  const createVerificationTemplateResponse =
    await createVerificationTemplateMdoc(
      tenantId,
      {
        ...openidMdocVerificationTemplate,
        restrictions: { credentialTemplateId: credentialTemplateId },
      },
      client
    );
  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;
  console.log(
    chalk.green(`Verification Template ID: ${verificationTemplateId}`)
  ); // Step 5: Send a proof request - FULLY ACTIVE

  await sendProofRequest(tenantId, verificationTemplateId, client);
  console.log(chalk.blue.bold("--- OpenID mDoc Workflow Complete ---"));
}
