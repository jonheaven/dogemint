# Dogemint Library Architecture

## Project Goals
- Provide a frontend-friendly, modular library for minting Doginals and handling Dogecoin wallet operations.
- Support both local node RPC and paid API services for transaction broadcasting.
- Enable easy integration into web3 dApps (React, Next.js, Vue, browser extensions).

## High-Level Structure
```
dogemint/
  src/
    index.ts
    minting/
      inscription.ts
      batch.ts
    wallet/
      wallet.ts
      utxo.ts
      address.ts
    rpc/
      client.ts
      api.ts
    utils/
      types.ts
      helpers.ts
  docs/
  tests/
  package.json
  tsconfig.json
  README.md
```

## Core Modules
### 1. Minting
- `inscription.ts`: Functions to create Doginal inscriptions from arbitrary data (text, image, etc.).
- `batch.ts`: Batch minting/inscribing operations.

### 2. Wallet
- `wallet.ts`: Wallet abstraction, key/address management, signing.
- `utxo.ts`: UTXO selection and management for minting transactions.
- `address.ts`: Address generation and validation.

### 3. RPC/API
- `client.ts`: Configurable RPC client for Dogecoin Core or paid API services.
- `api.ts`: Abstraction layer for transaction creation, signing, and broadcasting.

### 4. Utils
- `types.ts`: Shared types/interfaces (e.g., Inscription, Transaction, UTXO).
- `helpers.ts`: Utility functions for encoding, validation, etc.

## Extensibility
- Modular design allows dApp developers to import only needed features.
- Easy to add support for new inscription types or API providers.

## Usage Example
```typescript
import { createInscription, sendInscription } from 'dogemint/minting';
import { getWallet, listUtxos } from 'dogemint/wallet';
import { broadcastTransaction } from 'dogemint/rpc';
```

## Next Steps
- Scaffold initial npm package structure.
- Implement core modules and document APIs.
- Write usage guides for web3 dApp integration.

---
This architecture document provides a blueprint for building the Dogemint library. Future agents should use this to guide implementation and ensure modularity and frontend compatibility.
