# Dogemint Frontend API Design

## API Principles
- **Frontend-first**: Usable in browser extensions and web3 dApps.
- **Modular**: Import only what you need (minting, wallet, RPC, etc.).
- **Configurable**: Support for local node RPC or paid API services.
- **TypeScript**: Strong typing for safety and developer experience.

## Core API Functions

### Minting & Inscribing
```typescript
// Create a new Doginal inscription
createInscription({
  data: string | Buffer, // Data to inscribe (text, image, etc.)
  contentType: string,   // MIME type
  address?: string,      // Optional destination address
}): Promise<Inscription>

// Batch inscribe multiple items
batchInscribe([
  { data, contentType, address },
  ...
]): Promise<Inscription[]>
```

### Transaction Building & Broadcasting
```typescript
// Build a transaction for an inscription
buildInscriptionTransaction({
  inscription: Inscription,
  utxos: UTXO[],
  feeRate?: number,
}): Promise<Transaction>

// Sign a transaction
signTransaction({
  transaction: Transaction,
  privateKey: string,
}): Promise<SignedTransaction>

// Broadcast a signed transaction
broadcastTransaction({
  signedTransaction: SignedTransaction,
  rpcConfig?: RpcConfig,
}): Promise<string> // Returns txid
```

### Wallet Operations
```typescript
// Generate a new Dogecoin address
getNewAddress(): Promise<string>

// List available UTXOs for an address
listUtxos({ address: string }): Promise<UTXO[]>

// Get wallet balance
getBalance({ address: string }): Promise<number>
```

### RPC/API Configuration
```typescript
// Set up RPC or API provider
configureProvider({
  type: 'rpc' | 'api',
  url: string,
  auth?: { user: string, pass: string },
}): void
```

## Extensibility
- Add support for new inscription types (e.g., video, batch metadata).
- Plug in new API providers or wallet backends.

## Example Usage
```typescript
import { createInscription, broadcastTransaction, configureProvider } from 'dogemint';

configureProvider({ type: 'rpc', url: 'http://localhost:22555', auth: { user: 'rpcuser', pass: 'rpcpass' } });

const inscription = await createInscription({ data: 'Hello Doginals!', contentType: 'text/plain' });
const tx = await buildInscriptionTransaction({ inscription, utxos });
const signedTx = await signTransaction({ transaction: tx, privateKey });
const txid = await broadcastTransaction({ signedTransaction: signedTx });
```

---
This document defines the frontend API for Dogemint, guiding implementation and usage for dApp developers. Future agents should use this as the reference for all minting, wallet, and transaction operations.
