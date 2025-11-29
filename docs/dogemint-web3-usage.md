# Dogemint Usage for Web3 dApps

## Overview
Dogemint is designed for easy integration into modern web3 dApps and browser wallet extensions. It provides modular APIs for minting Doginals, managing Dogecoin wallets, and broadcasting transactions.

## Installation
```bash
npm install dogemint
```

## Basic Setup
```typescript
import { configureProvider, createInscription, buildInscriptionTransaction, signTransaction, broadcastTransaction } from 'dogemint';

// Configure for local node RPC
configureProvider({ type: 'rpc', url: 'http://localhost:22555', auth: { user: 'rpcuser', pass: 'rpcpass' } });

// Or configure for paid API
configureProvider({ type: 'api', url: 'https://api.nownodes.io', apiKey: 'your-api-key' });
```

## Minting a Doginal
```typescript
const inscription = await createInscription({
  data: 'Hello Doginals!',
  contentType: 'text/plain',
  address: 'D8...yourDogecoinAddress',
});
```

## Building and Broadcasting a Transaction
```typescript
const utxos = await listUtxos({ address: 'D8...yourDogecoinAddress' });
const tx = await buildInscriptionTransaction({ inscription, utxos });
const signedTx = await signTransaction({ transaction: tx, privateKey: 'your-private-key' });
const txid = await broadcastTransaction({ signedTransaction: signedTx });
```

## Batch Inscription
```typescript
const batch = await batchInscribe([
  { data: 'First', contentType: 'text/plain', address },
  { data: 'Second', contentType: 'text/plain', address },
]);
```

## Wallet Operations
```typescript
const newAddress = await getNewAddress();
const balance = await getBalance({ address: newAddress });
```

## Extending Dogemint
- Add new inscription types by extending the minting module.
- Implement new providers by following the provider interface.
- Use only the modules you need for lightweight builds.

## Security Tips
- Never expose private keys in browser environments.
- Prefer using hardware wallets or secure key management for signing.
- Use local node RPC for maximum privacy.

---
This guide provides practical examples for integrating Dogemint into web3 dApps. Future agents should update this document as new features and best practices emerge.
