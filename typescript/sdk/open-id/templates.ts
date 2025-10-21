import chalk from "chalk";
import { TCredentialFormat } from "../types";
import { OpenIdEcosystem } from "@hovi/core-sdk";
export async function createCredentialTemplate(
  tenantId: string,
  payload: any,
  format: TCredentialFormat,
  client: InstanceType<typeof OpenIdEcosystem>
) {
  let result;
  switch (format) {
    case "jsonld": {
      result = await client.createCredentialTemplateJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "sd-jwt": {
      result = await client.createCredentialTemplateSdJwt({
        tenantId,
        ...payload,
      });
      break;
    }
    case "mdoc": {
      result = await client.createCredentialTemplateMdoc({
        tenantId,
        ...payload,
      });
      break;
    }
    default:
      throw new Error(`Unsupported credential format: ${format}`);
  }
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
  format: TCredentialFormat,
  client: InstanceType<typeof OpenIdEcosystem>
) => {
  let result;
  switch (format) {
    case "jsonld": {
      result = await client.createVerificationTemplateJsonld({
        tenantId,
        ...payload,
      });
      break;
    }
    case "sd-jwt": {
      result = await client.createVerificationTemplateSdJwt({
        tenantId,
        ...payload,
      });
      break;
    }
    case "mdoc": {
      result = await client.createVerificationTemplateMdoc({
        tenantId,
        ...payload,
      });
      break;
    }
    default:
      throw new Error(`Unsupported credential format: ${format}`);
  }
  if (!result.success) {
    console.log(
      chalk.red(`❌ Failed to create verification template: ${result}`)
    );
    throw new Error(result as string);
  }
  console.log("✅ Verification template created successfully", result);
  return result;
};
