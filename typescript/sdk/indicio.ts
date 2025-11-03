import { createConnection } from "./indicio/connection";
import {
  anoncredCredentialTemplate,
  anoncredVerificationTemplate,
  jsonLdCredentialTemplate,
  jsonLdVerificationTemplate,
} from "./faker";
import { IndicioEcosystem } from "@hovi/core-sdk";
import {
  createCredentialTemplateAnoncred,
  createCredentialTemplateJsonLd,
  createVerificationTemplateAnoncred,
  createVerificationTemplateJsonLd,
} from "./indicio/templates";
import {
  offerCredentialAnoncred,
  offerCredentialJsonLd,
} from "./indicio/issue";
import { sendProofRequest } from "./indicio/verify";
import { createTenant } from "./utils/tenant";

export async function indicioJsonLdWorkFlow(
  client: InstanceType<typeof IndicioEcosystem>
) {
  console.log("\n--- Starting INDICIO JSON-LD Workflow ---");

  // 1. Create Tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "IndicioJsonLdIssuer",
      tenantLabel: "Indicio JSON-LD Issuer",
      tenantSecret: "secret-key-1",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const organizationId = tenantResponse.response.organizationId;

  // 2. Create Connection
  const connectionResponse = await createConnection(organizationId, client);
  const connectionId = connectionResponse.connectionId;

  // 3. Create Credential Template (JSON-LD)
  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    organizationId,
    jsonLdCredentialTemplate,
    client
  );

  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId;

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

  // 3. Create Verification Template (JSON-LD)
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

  // 4. Send proof request for (JSON-LD)
  await sendProofRequest(
    organizationId,
    verificationTemplateId,
    connectionId,
    client
  );
}

export async function indicioAnoncredWorkFlow(
  client: InstanceType<typeof IndicioEcosystem>
) {
  console.log("\n--- Starting INDICIO Anoncred Workflow ---");

  // 1. Create Tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "IndicioJsonLdIssuer",
      tenantLabel: "Indicio JSON-LD Issuer",
      tenantSecret: "secret-key-1",
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

  // 4. Offer Credential (Anoncred)
  await offerCredentialAnoncred(
    organizationId,
    {
      credentialTemplateId,
      connectionId,
      credentialValues: {
        age: "40",
      },
    },
    client
  );

  // 3. Create Verification Template (Anoncred)
  const createVerificationTemplateResponse =
    await createVerificationTemplateAnoncred(
      organizationId,
      anoncredVerificationTemplate,
      client
    );
  const verificationTemplateId =
    createVerificationTemplateResponse?.response?.verificationTemplateId!;

  await sendProofRequest(
    organizationId,
    verificationTemplateId,
    connectionId,
    client
  );
  console.log("--- INDICIO Anoncred Workflow Setup Complete ---");
}
