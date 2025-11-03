# hovi-sdk-examples

A clean, minimalist set of TypeScript examples demonstrating end-to-end credential issuance and verification workflows using the **Hovi Core SDK**.

---

## 🚀 Quick Start

### 1. Setup

First, navigate to the `typescript/sdk` directory and install the dependencies.

```bash
# Navigate to the SDK directory
cd hovi-sdk-examples/typescript/sdk
# Install dependencies
npm install
````

### 2\. Configure API Key

Create a new file named `.env` in the `typescript/sdk` directory based on the provided `.env.example`.

```bash
cp .env.example .env
```

Edit the `.env` file and replace the placeholder with your actual Hovi API key:

```
BASE_URL=[https://api-dev.hovi.id](https://api-dev.hovi.id)
API_KEY=<YOUR_ECOSYSTEM_API_KEY_HERE>
```

### 3\. Run a Workflow

The entry point for all examples is `index.ts`. By default, the **OpenID JSON-LD workflow** is enabled.

To run the currently enabled workflow:

```bash
npm start
```

> **Note:** For workflows involving **Connections** (Cheqd, Indicio, PrivadoID), you must scan the initial QR code with a compatible digital wallet (like Hovi Wallet) to establish the connection before the Credential Offer and Proof Request steps can proceed.

-----

## 📚 Managing Example Workflows

The `typescript/sdk/index.ts` file acts as a simple menu. To run a different workflow:

1.  Open `typescript/sdk/index.ts`.
2.  **Comment out** the currently active workflow block (e.g., `await indicioJsonLdWorkFlow(indicioClient);`).
3.  **Uncomment** the block for the desired ecosystem (e.g., OpenID).

All workflow files (e.g., `cheqd.ts`, `open-id.ts`) are completely sequenced, running every necessary step from Tenant creation to Proof Request, with no vital steps commented out.

### Available Workflows

| Ecosystem | Credential Type | Function Name | Notes |
| :--- | :--- | :--- | :--- |
| **OpenID** | SD-JWT | `openIdSdJwtWorkFlow(client)` | Full flow including Offer (QR) & Verify (QR) |
| **OpenID** | JSON-LD | `openIdJsonLdWorkFlow(client)` | Full flow including Offer (QR) & Verify (QR) |
| **OpenID** | mDoc | `openIDmDocWorkFlow(client)` | Full flow including Offer (QR) & Verify (QR) |
| **Cheqd** | JSON-LD | `cheqdJsonLdWorkFlow(client)` | Full flow requiring Connection scan. |
| **Cheqd** | Anoncred | `cheqdAnoncredWorkFlow(client)` | Full flow requiring Connection scan. |
| **Indicio** | JSON-LD | `indicioJsonLdWorkFlow(client)` | Full flow requiring Connection scan. (Default Active) |
| **Indicio** | Anoncred | `indicioAnoncredWorkFlow(client)` | Full flow requiring Connection scan. |
| **PrivadoID**| JSON-LD | `privadoIdJsonLdWorkFlow(client)` | Full flow requiring Connection scan. |

-----



