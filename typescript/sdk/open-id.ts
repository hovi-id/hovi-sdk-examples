import { faker } from "@faker-js/faker";
import { createCredentialOffer } from "./open-id/issue";
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
  createCredentialTemplate,
  createVerificationTemplate,
} from "./open-id/templates";

export async function openIdSdJwtWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "Your Tenant Name", // Replace with your tenant's name
      tenantLabel: "Your Tenant Label", // Replace with a descriptive label
      tenantSecret: "Your Tenant Secret", // Replace with a secure secret key
      imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
    },
    client
  );
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    openidSdJwtCredentialTemplate,
    "sd-jwt",
    client
  );
  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    "sd-jwt",
    client
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...openidSdJwtVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "sd-jwt",
    client
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse?.response?.verificationTemplateId!,
    client
  );
}

export async function openIdJsonLdWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "Your Tenant Name", // Replace with your tenant's name
      tenantLabel: "Your Tenant Label", // Replace with a descriptive label
      tenantSecret: "Your Tenant Secret", // Replace with a secure secret key
      imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
    },
    client
  );
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    jsonLdCredentialTemplate,
    "jsonld",
    client
  );
  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    "jsonld",
    client
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...jsonLdVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "jsonld",
    client
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse?.response?.verificationTemplateId!,
    client
  );
}

export async function openIDmDocWorkFlow(
  client: InstanceType<typeof OpenIdEcosystem>
) {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "Your Tenant Name", // Replace with your tenant's name
      tenantLabel: "Your Tenant Label", // Replace with a descriptive label
      tenantSecret: "Your Tenant Secret", // Replace with a secure secret key
      imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
    },
    client
  );
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.tenantId,
    openidMdocCredentialTemplate,
    "mdoc",
    client
  );
  // Step 3: Create a new credential offer
  const offerCredential = await createCredentialOffer(
    tenantResponse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      credentialValues: {
        age: faker.number.int({ min: 18, max: 65 }),
      },
    },
    "mdoc",
    client
  );
  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.tenantId,
    {
      ...openidMdocVerificationTemplate,
      restrictions: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    },
    "mdoc",
    client
  );
  // Step 5: Send a proof request
  const sentProofRequest = await sendProofRequest(
    tenantResponse.response.tenantId,
    createVerificationTemplateResponse?.response?.verificationTemplateId!,
    client
  );
}
