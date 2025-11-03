import {
  CheqdEcosystem,
  IndicioEcosystem,
  OpenIdEcosystem,
  PrivadoEcosystem,
} from "@hovi/core-sdk";
import dotenv from "dotenv";
import {
  openIdJsonLdWorkFlow,
  openIDmDocWorkFlow,
  openIdSdJwtWorkFlow,
} from "./open-id";
import { cheqdAnoncredWorkFlow, cheqdJsonLdWorkFlow } from "./cheqd";
import { indicioAnoncredWorkFlow, indicioJsonLdWorkFlow } from "./indicio";
import { privadoIdJsonLdWorkFlow } from "./privado-id";

dotenv.config();

export const config = {
  base_url: process.env.BASE_URL,
  api_key: process.env.API_KEY,
};

// Type definition remains
export type TCredentialFormat = "mdoc" | "sd-jwt" | "jsonld" | "anoncred";

async function main() {
  console.log("Hovi SDK Examples Starting...\n");

  // const openIdClient = new OpenIdEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // await openIdSdJwtWorkFlow(openIdClient);
  // await openIDmDocWorkFlow(openIdClient);
  // await openIdJsonLdWorkFlow(openIdClient);

  // const privadoIdClient = new PrivadoEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // await privadoIdJsonLdWorkFlow(privadoIdClient);

  const indicioClient = new IndicioEcosystem({
    apiKey: config.api_key!,
    apiBaseUrl: config.base_url,
  });
  await indicioJsonLdWorkFlow(indicioClient);
  // await indicioAnoncredWorkFlow(indicioClient);

  // const cheqdClient = new CheqdEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // await cheqdJsonLdWorkFlow(cheqdClient);
  // await cheqdAnoncredWorkFlow(cheqdClient);
}

main().catch((error) => {
  console.error("An error occurred during the main execution:", error.message);
  process.exit(1);
});
