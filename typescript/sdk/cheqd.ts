import { createConnection } from "./cheqd/connection";

import { createTenant } from "./utils/tenant";
import {
  anoncredCredentialTemplate,
  anoncredVerificationTemplate,
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
} from "./faker";
import { CheqdEcosystem } from "@hovi/core-sdk";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./cheqd/templates";
import { createCredentialOffer } from "./cheqd/issue";
import { sendProofRequest } from "./cheqd/verify";

export async function cheqdJsonLdWorkFlow(
  client: InstanceType<typeof CheqdEcosystem>
) {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "YourTenantName", // Replace with your tenant's name
      tenantLabel: "YourTenantLabel", // Replace with a descriptive label
      tenantSecret: "YourTenantSecret", // Replace with a secure secret key
      imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
    },
    client
  );
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.organizationId,
    jsonLdCredentialTemplate,
    "jsonld",
    client
  );

  // // Step 3: Create a new connection
  // const connectionResponse = await createConnection(
  //   tenantResponse.response.organizationId,
  //   client
  // );

  // // Step 4: Create a new credential offer
  // const offerCredential = await createCredentialOffer(
  //   tenantResponse.response.organizationId,
  //   {
  //     credentialTemplateId:
  //       createCredentialTemplateResponse.response.credentialTemplateId,
  //     connectionId: connectionResponse.connectionId,
  //     credentialValues: {
  //       age: 40,
  //     },
  //     holderDid: tenantResponse.response.dids[0].did,
  //   },
  //   "jsonld",
  //   client
  // );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.organizationId,
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
  // const sentProofRequest = await sendProofRequest(
  //   tenantResponse.response.organizationId,
  //   createVerificationTemplateResponse?.response?.verificationTemplateId!,
  //   connectionResponse.connectionId,
  //   client
  // );
}

export async function cheqdAnoncredWorkFlow(
  client: InstanceType<typeof CheqdEcosystem>
) {
  // Step 1: Create a new tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "YourTenantName", // Replace with your tenant's name
      tenantLabel: "YourTenantLabel", // Replace with a descriptive label
      tenantSecret: "YourTenantSecret", // Replace with a secure secret key
      imageUrl: "https://yourdomain.com/logo.png", // Replace with your logo URL
    },
    client
  );
  // Step 2: Create a new credential template
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantResponse.response.organizationId,
    anoncredCredentialTemplate,
    "anoncred",
    client
  );

  // // Step 3: Create a new connection
  // const connectionResponse = await createConnection(
  //   tenantResponse.response.organizationId,
  //   client
  // );

  // // Step 4: Create a new credential offer
  // const offerCredential = await createCredentialOffer(
  //   tenantResponse.response.organizationId,
  //   {
  //     credentialTemplateId:
  //       createCredentialTemplateResponse.response.credentialTemplateId,
  //     connectionId: connectionResponse.connectionId,
  //     credentialValues: {
  //       age: "40",
  //     },
  //   },
  //   "anoncred",
  //   client
  // );

  // Step 4: Create a new verification template
  const createVerificationTemplateResponse = await createVerificationTemplate(
    tenantResponse.response.organizationId,
    anoncredVerificationTemplate,
    "anoncred",
    client
  );

  // Step 5: Send a proof request
  // const sentProofRequest = await sendProofRequest(
  //   tenantResponse.response.organizationId,
  //   createVerificationTemplateResponse?.response?.verificationTemplateId!,
  //   connectionResponse.connectionId,
  //   client
  // );
}
