import { IndicioEcosystem } from "@hovi/core-sdk";

export const sendProofRequest = async (
  tenantId: string,
  verificationTemplateId: string,
  connectionId: string,
  client: InstanceType<typeof IndicioEcosystem>
) => {
  const result = await client.sendProofRequest({
    tenantId,
    verificationTemplateId,
    connectionId,
  });
  if (!result.success) {
    throw new Error(result.message);
  }
  console.log("Verification proof request sent");
};
