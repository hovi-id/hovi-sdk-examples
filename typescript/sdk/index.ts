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

async function main() {
  // OpenId Work Flow
  // const openIdClient = new OpenIdEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // const openId = await openIdJsonLdWorkFlow(openIdClient);
  // const openId = await openIdSdJwtWorkFlow(openIdClient);
  // const openId = await openIDmDocWorkFlow(openIdClient);

  // Indicio Work flow
  // const indicioClient = new IndicioEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // const indicio = await indicioJsonLdWorkFlow(indicioClient);
  // const indicio = await indicioAnoncredWorkFlow(indicioClient);

  // Cheqd Work Flow
  // const cheqdClient = new CheqdEcosystem({
  //   apiKey: config.api_key!,
  //   apiBaseUrl: config.base_url,
  // });
  // const cheqd = await cheqdAnoncredWorkFlow(cheqdClient);
  // const cheqd = await cheqdJsonLdWorkFlow(cheqdClient);

  // Privado Work Flow
  const privadoIdClient = new PrivadoEcosystem({
    apiKey: config.api_key!,
    apiBaseUrl: config.base_url,
  });
  const privado = await privadoIdJsonLdWorkFlow(privadoIdClient);
}

main();
