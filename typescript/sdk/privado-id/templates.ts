import chalk from "chalk";
import { TCredentialFormat } from "../types";
import { PrivadoEcosystem } from "@hovi/core-sdk";
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) {
  let result: any = await client.createCredentialTemplateJsonld({
    tenantId,
    ...payload,
  });
  if (!result.success) {
    console.log(
      chalk.red(`❌ Failed to create credential template: ${result.message}`)
    );
    throw new Error(result.message);
  }
  console.log("✅ Credential template created successfully", result);
  return result;
}

export const createVerificationTemplate = async (
  tenantId: string,
  payload: any,
  client: InstanceType<typeof PrivadoEcosystem>
) => {
  let result: any = await client.createVerificationTemplateJsonldRequest({
    tenantId,
    ...payload,
  });

  if (!result.success) {
    console.log(
      chalk.red(`❌ Failed to create verification template: ${result}`)
    );
    throw new Error(result as string);
  }
  console.log("✅ Verification template created successfully", result);
  return result;
};
