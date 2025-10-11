import { issueCredential } from "./OpenID/issue";
import logger from "./utils/logger";
import { intiWallet } from "./OpenID/create_wallet";

async function main() {
  try {
    logger.info("🚀 Starting the workflow...");
    // Create Wallet
    const wallet = await intiWallet();
    // Issue Credential
    const issueCredentialResponse = await issueCredential();
  } catch (error) {
    logger.error("❌ Error in workflow:", error);
  }
}
main();
