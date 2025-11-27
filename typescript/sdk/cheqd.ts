import { CheqdEcosystem } from "@hovi/core-sdk";
import { createConnection } from "./cheqd/connection";
import {
  createCredentialTemplateAnoncred,
  createCredentialTemplateJsonLd,
  createVerificationTemplateAnoncred,
  createVerificationTemplateJsonLd,
} from "./cheqd/templates";
import { offerCredentialAnoncred, offerCredentialJsonLd } from "./cheqd/issue";
import { sendProofRequest } from "./cheqd/verify";
import { createTenant } from "./utils/tenant";
import {
  anoncredCredentialTemplate,
  anoncredVerificationTemplate,
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
} from "./faker";

export async function cheqdJsonLdWorkFlow(
  client: InstanceType<typeof CheqdEcosystem>
) {
  console.log("\n--- Starting CHEQD JSON-LD Workflow ---");

  // 1. Create Tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "CheqdJsonLdIssuer",
      tenantLabel: "Cheqd JSON-LD Issuer",
      tenantSecret: "secret-key-1",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const organizationId = tenantResponse.response.organizationId;

  // 2. Create Credential Template (JSON-LD)
  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    organizationId,
    jsonLdCredentialTemplate,
    client
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // 3. Create Connection
  const connectionResponse = await createConnection(organizationId, client);
  const connectionId = connectionResponse.connectionId;

  // 4. Create Credential Offer
  await offerCredentialJsonLd(
    organizationId,
    {
      credentialTemplateId: credentialTemplateId,
      connectionId: connectionId,
      credentialValues: { age: 40 },
      holderDid: tenantResponse.response.dids[0].did,
    },
    client
  );

  // 5. Create Verification Template (JSON-LD)
  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(
      organizationId,
      {
        ...jsonLdVerificationTemplate,
        restrictions: { credentialTemplateId: credentialTemplateId },
      },
      client
    );
  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;

  // 6. Send Proof Request
  await sendProofRequest(
    organizationId,
    verificationTemplateId,
    connectionId,
    client
  );
  console.log("--- CHEQD JSON-LD Workflow Setup Complete ---");
}

export async function cheqdAnoncredWorkFlow(
  client: InstanceType<typeof CheqdEcosystem>
) {
  console.log("\n--- Starting CHEQD Anoncred Workflow ---");

  // 1. Create Tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "CheqdAnoncredIssuer",
      tenantLabel: "Cheqd Anoncred Issuer",
      tenantSecret: "secret-key-2",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const organizationId = tenantResponse.response.organizationId;

  // 2. Create Credential Template (Anoncred)
  const createCredentialTemplateResponse =
    await createCredentialTemplateAnoncred(
      organizationId,
      anoncredCredentialTemplate,
      client
    );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

  // 3. Create Connection
  const connectionResponse = await createConnection(organizationId, client);
  const connectionId = connectionResponse.connectionId;

  // 4. Create Credential Offer
  await offerCredentialAnoncred(
    organizationId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
      connectionId: connectionResponse.connectionId,
      credentialValues: {
        age: "20",
      },
    },
    client
  );

  // 5. Create Verification Template (Anoncred)
  const createVerificationTemplateResponse =
    await createVerificationTemplateAnoncred(
      organizationId,
      anoncredVerificationTemplate,
      client
    );

  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;

  // 6. Send Proof Request
  await sendProofRequest(
    organizationId,
    verificationTemplateId,
    connectionId,
    client
  );
  console.log("--- CHEQD Anoncred Workflow Setup Complete ---");
}
