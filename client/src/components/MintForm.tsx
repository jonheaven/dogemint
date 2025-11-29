

import React, { useState } from 'react';
import Toast from './Toast';
import { createInscription } from '../../../src/minting/inscription';
import { buildInscriptionTransaction } from '../../../src/minting/transaction';
import { signTransaction } from '../../../src/minting/signing';
import { broadcastTransaction } from '../../../src/rpc/client';
import { DogecoinProvider } from '../../../src/rpc/provider';


export default function MintForm() {
  const [data, setData] = useState('');
  const [contentType, setContentType] = useState('text/plain');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [utxos, setUtxos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [tx, setTx] = useState(null);
  const [signedTx, setSignedTx] = useState(null);
  const [preview, setPreview] = useState(false);
  const [view, setView] = useState<'text' | 'code'>('text');

  const provider = DogecoinProvider.getDefault();
  const fetchUtxos = async (address: string) => {
    return await provider.listUtxos(address);
  };

  const handlePreview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inscription = createInscription(contentType, Buffer.from(data));
      const fetchedUtxos = await fetchUtxos(address);
      setUtxos(fetchedUtxos);
      if (!fetchedUtxos.length) throw new Error('No UTXOs found for address. Fund your wallet first.');
      const txBuilt = buildInscriptionTransaction({ inscription, utxos: fetchedUtxos, feeRate: 1, provider });
      const signed = signTransaction({ transaction: txBuilt, privateKey, provider });
      setTx(txBuilt);
      setSignedTx(signed);
      setPreview(true);
    } catch (err) {
      setToastMsg('Error building transaction: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Preview error:', err);
    }
  };

  const handleMint = async () => {
    try {
      if (!signedTx) return;
      const txid = await provider.broadcastTransaction(signedTx);
      setToastMsg(txid ? `Mint transaction sent! TxID: ${txid}` : 'Broadcast failed');
      setShowToast(true);
      setPreview(false);
    } catch (err) {
      setToastMsg('Error minting: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Mint error:', err);
    }
  };

  return (
    <section id="mint" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Mint Doginal</h2>
      <form onSubmit={handlePreview} className="space-y-4">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Data to inscribe (text, image URL, etc.)"
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Content Type (e.g. text/plain, image/png)"
          value={contentType}
          onChange={e => setContentType(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Destination Dogecoin Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Private Key (WIF)"
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Preview Transaction</button>
      </form>
      {preview && tx && signedTx && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <div className="mb-2">
            <button onClick={() => setView('text')} className={view === 'text' ? 'font-bold' : ''}>Text View</button>
            <button onClick={() => setView('code')} className={view === 'code' ? 'font-bold ml-2' : 'ml-2'}>Code View</button>
          </div>
          {view === 'text' ? (
            <div>
              <strong>Inputs:</strong>
              <ul>
                {tx.inputs.map((input, i) => (
                  <li key={i}>{input.txid}:{input.vout} - {input.value} DOGE ({input.address})</li>
                ))}
              </ul>
              <strong>Outputs:</strong>
              <ul>
                {tx.outputs.map((output, i) => (
                  <li key={i}>{output.address} - {output.value} DOGE</li>
                ))}
              </ul>
              <strong>Raw Transaction Hex:</strong>
              <pre>{signedTx.raw}</pre>
            </div>
          ) : (
            <div>
              <strong>Transaction Object (Code View):</strong>
              <pre style={{ background: '#222', color: '#fff', padding: '1em', borderRadius: '6px', overflowX: 'auto' }}>
                {JSON.stringify(tx, null, 2)}
              </pre>
            </div>
          )}
          <button onClick={handleMint} className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition mt-4">Send Transaction</button>
          <button onClick={() => setPreview(false)} className="ml-2 px-6 py-2 rounded font-semibold border">Cancel</button>
        </div>
      )}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
    </section>
  );
}
