// FILE: typescript/sdk/privado-id/verify.ts (Cleaned)

import { PrivadoEcosystem } from "@hovi/core-sdk";

export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId: string,
  client: InstanceType<typeof PrivadoEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
    connectionId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("✅ Verification proof request sent");
};
