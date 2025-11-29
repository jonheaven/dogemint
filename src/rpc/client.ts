// Dogemint: RPC/API Client Abstraction

export interface RpcConfig {
  type: 'rpc' | 'api';
  url: string;
  auth?: { user: string; pass: string };
  apiKey?: string;
}

import { DogecoinProvider } from './provider';

// Deprecated: Use DogecoinProvider for all config and broadcast logic
export function configureProvider(config) {
  DogecoinProvider.configure(config);
}

export function getProviderConfig() {
  return DogecoinProvider.getConfig();
}

/**
 * Broadcast a signed transaction via RPC or API
 */

/**
 * Broadcast a signed Dogecoin transaction using Tatum API
 */
export async function broadcastTransaction(params: {
  signedTransaction: { raw: string };
  apiKey?: string;
}): Promise<string | null> {
  // Use Tatum broadcast endpoint
  if (!params.apiKey) throw new Error('API key required for broadcast');
  const url = 'https://api.tatum.io/v3/dogecoin/broadcast';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': params.apiKey,
      'content-type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ txData: params.signedTransaction.raw }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  // Tatum returns { txId: '...' }
  return data.txId || null;
}
