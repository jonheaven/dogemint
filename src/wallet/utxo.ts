// Dogemint: UTXO Management

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  address: string;
}
import { DogecoinProvider } from '../rpc/provider';

/**
 * List available UTXOs for an address using Tatum API
 */
export async function listUtxos(params: { address: string; apiKey: string }): Promise<UTXO[]> {
  const url = `https://api.tatum.io/v3/dogecoin/utxo/${params.address}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': params.apiKey,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch UTXOs');
  const data = await res.json();
  // Tatum returns array of { txHash, index, value, address }
  return data.map((utxo: any) => ({
    txid: utxo.txHash,
    vout: utxo.index,
    value: utxo.value,
    address: utxo.address,
  }));
}
