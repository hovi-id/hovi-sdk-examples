import { PrivadoEcosystem } from "@hovi/core-sdk";
import { createTenant } from "./utils/tenant";
import {
  createCredentialTemplate,
  createVerificationTemplate,
} from "./privado-id/templates";
import { createConnection } from "./privado-id/connection";
import { createCredentialOffer } from "./privado-id/issue";
import {
  jsonLdCredentialTemplatePrivadoId,
  jsonLdVerificationTemplatePrivadoId,
} from "./faker";
import { sendProofRequest } from "./privado-id/verify";

export async function privadoIdJsonLdWorkFlow(
  client: InstanceType<typeof PrivadoEcosystem>
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
  // const createCredentialTemplateResponse = await createCredentialTemplate(
  //   tenantResponse.response.organizationId,
  //   jsonLdCredentialTemplatePrivadoId,
  //   client
  // );

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
  // const createVerificationTemplateResponse = await createVerificationTemplate(
  //   tenantResponse.response.organizationId,
  //   {
  //     ...jsonLdVerificationTemplatePrivadoId,
  //     restrictions: {
  //       credentialTemplateId:
  //         createCredentialTemplateResponse.response.credentialTemplateId,
  //     },
  //   },
  //   client
  // );

  // // Step 5: Send a proof request
  // const sentProofRequest = await sendProofRequest(
  //   tenantResponse.response.organizationId,
  //   createVerificationTemplateResponse?.response?.verificationTemplateId!,
  //   connectionResponse.connectionId,
  //   client
  // );
}
