// Dogemint: Wallet Management

export interface Wallet {
  address: string;
  privateKey?: string;
}
import * as Doge from 'doge-sdk';

/**
 * Generate a new Dogecoin address using doge-sdk
 */
export function generateAddress() {
  // Use doge-sdk to generate a Dogecoin address and private key locally
  const keyPair = Doge.ECPair ? Doge.ECPair.makeRandom() : Doge.makeRandom();
  const { address } = Doge.getAddress(keyPair);
  // Optionally, return WIF private key for user backup
  // const wif = keyPair.toWIF();
  return address;
}

/**
 * Get wallet balance using Tatum API
 */
export async function getBalance(params: { address: string; apiKey: string }): Promise<number> {
  const url = `https://api.tatum.io/v3/dogecoin/account/balance/${params.address}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': params.apiKey,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  // Tatum returns { balance: string }
  return Number(data.balance);
}
