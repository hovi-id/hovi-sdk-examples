import { PrivadoEcosystem } from "@hovi/core-sdk";
import { createTenant } from "./utils/tenant";
import {
  createCredentialTemplateJsonLd,
  createVerificationTemplateJsonLd,
} from "./privado-id/templates";
import { createConnection } from "./privado-id/connection";
import { offerCredentialJsonLd } from "./privado-id/issue";
import {
  jsonLdCredentialTemplatePrivadoId,
  jsonLdVerificationTemplatePrivadoId,
} from "./faker";
import { sendProofRequest } from "./privado-id/verify";

export async function privadoIdJsonLdWorkFlow(
  client: InstanceType<typeof PrivadoEcosystem>
) {
  console.log("\n--- Starting PrivadoID JSON-LD Workflow ---"); // 1. Create Tenant
  const tenantResponse = await createTenant(
    {
      tenantName: "PrivadoIdJsonLdIssuer",
      tenantLabel: "PrivadoID JSON-LD Issuer",
      tenantSecret: "secret-key-1",
      imageUrl: "https://yourdomain.com/logo.png",
    },
    client
  );
  const organizationId = tenantResponse.response.organizationId; // 2. Create Credential Template (JSON-LD)

  const createCredentialTemplateResponse = await createCredentialTemplateJsonLd(
    organizationId,
    jsonLdCredentialTemplatePrivadoId,
    client
  );
  const credentialTemplateId =
    createCredentialTemplateResponse.response.credentialTemplateId; // 3. Create Verification Template (JSON-LD)

  const connectionResponse = await createConnection(organizationId, client);
  const connectionId = connectionResponse.connectionId;

  await offerCredentialJsonLd(
    organizationId,
    {
      credentialTemplateId: credentialTemplateId,
      connectionId: connectionId,
      credentialValues: {
        age: 40,
      },
    },
    client
  );

  const createVerificationTemplateResponse =
    await createVerificationTemplateJsonLd(
      organizationId,
      {
        ...jsonLdVerificationTemplatePrivadoId,
        restrictions: { credentialTemplateId: credentialTemplateId },
      },
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
  console.log("--- PrivadoID JSON-LD Workflow Setup Complete ---");
}
