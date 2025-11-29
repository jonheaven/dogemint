# ord-dogecoin Minting & Inscription Logic Analysis

## Key Modules & Functions

### 1. `wallet.rs`
- Defines a `Wallet` struct and logic for loading wallet state via Dogecoin RPC.
- Uses: `options.dogecoin_rpc_client_for_wallet_command(false)` to interact with node wallet.
- Focus: Wallet operations, RPC integration, transaction creation/signing.

### 2. `test.rs`
- Contains helper functions for building test transactions and inscriptions:
  - `inscription(content_type, body)`: Creates an `Inscription` object.
  - `inscription_id(n)`: Generates unique inscription IDs.
  - `tx_in`, `tx_out`: Build transaction inputs/outputs.
  - Address helpers for testnet/mainnet.
- Useful for understanding how inscriptions are constructed and attached to transactions.

### 3. `templates/inscription.rs`
- `InscriptionHtml` struct: Used for rendering inscriptions in the frontend.
- Contains fields for chain, fee, height, inscription data, output, satpoint, timestamp, etc.
- Shows how inscriptions are represented and displayed, but not core minting logic.

## Minting/Inscribing Flow
- Inscription creation is handled by constructing an `Inscription` object with content type and body.
- Transactions are built using helper functions, then signed and broadcast via wallet RPC.
- The wallet module abstracts RPC calls, making it possible to swap between local node and API service.

## What to Extract for Dogemint
- **Inscription creation logic**: Functions for building inscriptions from arbitrary data.
- **Transaction building/signing**: Code for assembling Dogecoin transactions with inscriptions.
- **Wallet abstraction**: RPC/API client logic for sending transactions and managing UTXOs.
- **Batch operations**: Extend helpers to support batch inscription/minting.

## What to Ignore
- Chain indexing, explorer, historical scan logic.
- Any backend-specific code not related to minting or wallet operations.

## Next Steps
- Identify reusable code for inscription creation and transaction building.
- Design frontend-friendly APIs for these operations.
- Abstract RPC/API calls for flexibility.

---
This analysis will guide the extraction and refactoring of minting logic for the new Dogemint library. Future agents should refer to this document for context on what code is relevant for minting Doginals and wallet operations.
