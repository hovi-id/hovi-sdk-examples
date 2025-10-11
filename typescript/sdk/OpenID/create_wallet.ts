import { CloudWallet } from "@hovi/cloudwallet-sdk";
import config from "../Config/config";

export const intiWallet = async () => {
  return new CloudWallet({
    apiBaseUrl: config.cloud_wallet_url!,
    apiKey: config.cloud_wallet_api_key,
  });
};
