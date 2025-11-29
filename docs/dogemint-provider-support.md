# Dogemint Provider Support: Node RPC & Paid API Services

## Goals
- Allow dApp developers to choose between their own Dogecoin node (RPC) or third-party paid API services for transaction broadcasting and wallet operations.
- Make provider configuration seamless and extensible.

## Provider Types
### 1. Node RPC
- Connects directly to a Dogecoin Core node via JSON-RPC.
- Requires node URL and authentication (user/pass).
- Full control, privacy, and no third-party reliance.

### 2. Paid API Services
- Uses external providers (e.g., BlockCypher, NowNodes, custom APIs) for transaction broadcasting and wallet queries.
- Requires API key or token.
- Useful for users without a local node or for scaling dApps.

## Configuration API
```typescript
configureProvider({
  type: 'rpc' | 'api',
  url: string,
  auth?: { user: string, pass: string }, // For RPC
  apiKey?: string, // For paid API
}): void
```

## Internal Abstraction
- Provider logic is abstracted behind a common interface:
  - `sendTransaction`, `getUtxos`, `getBalance`, etc. all route to the configured provider.
- Easy to add new providers by implementing the interface.

## Example Usage
```typescript
// Node RPC
configureProvider({ type: 'rpc', url: 'http://localhost:22555', auth: { user: 'rpcuser', pass: 'rpcpass' } });

// Paid API
configureProvider({ type: 'api', url: 'https://api.nownodes.io', apiKey: 'your-api-key' });
```

## Extensibility
- Add support for new API providers by implementing the provider interface.
- Allow runtime switching between providers.

## Security & Privacy
- Warn users about privacy implications of using third-party APIs.
- Recommend local node for sensitive operations.

---
This document outlines how Dogemint will support both node RPC and paid API services, ensuring flexibility and extensibility for all dApp developers. Future agents should use this as a guide for implementing provider logic and configuration.
