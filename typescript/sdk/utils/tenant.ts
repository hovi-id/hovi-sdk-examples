import logger from "./logger";

export async function createTenant(payload: any, client: any) {
  const result = await client.createTenant(payload);
  if (!result.success) {
    logger.error(result.message);
    throw new Error(result.message);
  }

  console.log("✅ Tenant created successfully");
  return result;
}
