# Dogecoin Core Wallet & Minting API Analysis

## Key Components

### 1. `CWallet` (wallet/walletdb.h)
- Central class for wallet operations: key management, transaction creation, signing, UTXO management.
- Related classes: `CWalletTx` (wallet transaction), `CWalletDB` (wallet database access).
- Handles HD wallet features, key metadata, and persistent storage.

### 2. Transaction Functions
- `WriteTx`, `EraseTx`, `FindWalletTx`, `ZapWalletTx`, etc. for managing wallet transactions.
- Transaction creation, signing, and broadcasting are handled via wallet RPC and internal methods.

### 3. RPC Integration
- Dogecoin Core exposes wallet and transaction operations via RPC (see `rpc/server.h`).
- Common RPCs for dApp integration:
  - `sendtoaddress`, `sendmany`: Send coins to addresses.
  - `listunspent`: List available UTXOs.
  - `createrawtransaction`, `signrawtransactionwithkey`: Build and sign custom transactions.
  - `getnewaddress`, `getaddressesbylabel`: Address management.
  - `broadcasttransaction` (or `sendrawtransaction`): Broadcast signed transactions.

### 4. UTXO & Key Management
- HD chain support via `CHDChain` and `CKeyMetadata`.
- Functions for writing/reading keys, scripts, and watch-only addresses.
- UTXO selection and management for transaction building.

## What to Extract for Dogemint
- **RPC client logic**: For wallet, transaction, and broadcast operations.
- **Transaction building/signing**: Use raw transaction RPCs for inscription/minting.
- **UTXO management**: List and select UTXOs for minting transactions.
- **Address/key management**: Generate and manage addresses for inscriptions.

## What to Ignore
- Internal database/storage logic not needed for frontend library.
- Chain indexing, block processing, and backend-only features.

## Next Steps
- Build a frontend-friendly RPC client for Dogecoin Core wallet operations.
- Wrap transaction creation/signing/broadcast in modular APIs.
- Document usage for dApp developers.

---
This analysis provides a reference for extracting wallet and minting logic from Dogecoin Core for the Dogemint library. Future agents should use this to focus on RPC and transaction APIs relevant to minting Doginals.
