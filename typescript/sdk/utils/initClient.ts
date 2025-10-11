import {
  CheqdEcosystem,
  IndicioEcosystem,
  OpenIdEcosystem,
  PrivadoEcosystem,
} from "@hovi/core-sdk";
import config from "../Config/config";
import logger from "./logger";
import { TEcosystem } from "./types";
export const initClient = async (ecosystem: TEcosystem) => {
  logger.info("Initializing client...");
  const apiKyeType = config.api_key?.split("-")[0];
  if (!apiKyeType || apiKyeType.toLowerCase() !== ecosystem.toLowerCase()) {
    logger.error("❌ API key does not match the selected ecosystem");
    throw new Error("API key does not match the selected ecosystem");
  }
  switch (ecosystem) {
    case "OpenID":
      const openIDclient = new OpenIdEcosystem({
        apiBaseUrl: config.base_url!,
        apiKey: config.api_key!,
      });
      return { client: openIDclient, ecosystem };

    case "Privado":
      const privadoIDclient = new PrivadoEcosystem({
        apiBaseUrl: config.base_url!,
        apiKey: config.api_key!,
      });
      return { client: privadoIDclient, ecosystem };

    case "Indicio":
      const indicioClient = new IndicioEcosystem({
        apiBaseUrl: config.base_url!,
        apiKey: config.api_key!,
      });
      return { client: indicioClient, ecosystem };

    case "Cheqd":
      const cheqdClient = new CheqdEcosystem({
        apiBaseUrl: config.base_url!,
        apiKey: config.api_key!,
      });
      return { client: cheqdClient, ecosystem };

    default:
      logger.error("❌ Unsupported ecosystem");
      throw new Error("Unsupported ecosystem");
  }
};
