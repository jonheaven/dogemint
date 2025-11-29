// Tatum API utilities for frontend

export async function broadcastTransaction({ signedTransaction, apiKey }) {
  if (!apiKey) throw new Error('API key required for broadcast');
  const url = 'https://api.tatum.io/v3/dogecoin/broadcast';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'content-type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ txData: signedTransaction.raw }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.txId || null;
}

export async function listUtxos({ address, apiKey }) {
  const url = `https://api.tatum.io/v3/dogecoin/utxo/${address}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch UTXOs');
  const data = await res.json();
  return data.map((utxo) => ({
    txid: utxo.txHash,
    vout: utxo.index,
    value: utxo.value,
    address: utxo.address,
  }));
}

export async function getBalance({ address, apiKey }) {
  const url = `https://api.tatum.io/v3/dogecoin/account/balance/${address}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  return Number(data.balance);
}
