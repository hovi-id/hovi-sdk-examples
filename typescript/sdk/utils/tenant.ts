import chalk from "chalk";
import { config } from "..";
import { CreateTenantRequest } from "../types";
import logger from "./logger";
export async function createTenant(payload: CreateTenantRequest, client: any) {
  const result = await client.createTenant(payload);
  if (!result.success) {
    logger.error(result.message);
    throw new Error(result.message);
  }

  console.log("✅ Tenant created successfully", result);
  return result;
}
