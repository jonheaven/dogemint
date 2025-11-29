import React, { useState } from 'react';
import Toast from './Toast';
import { listUtxos } from '../../../src/wallet/utxo';

export default function UtxoPanel() {
  const [address, setAddress] = useState('');
  const [utxos, setUtxos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleListUtxos = async () => {
    try {
      const apiKey = localStorage.getItem('tatumApiKey') || '';
      if (!apiKey) {
        setToastMsg('Please set your Tatum API key in Settings.');
        setShowToast(true);
        return;
      }
      const utxosList = await listUtxos({ address, apiKey });
      setUtxos(utxosList);
      setToastMsg('UTXOs listed!');
      setShowToast(true);
      console.debug('UTXOs:', utxosList);
    } catch (err) {
      setToastMsg('Error listing UTXOs: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('UTXO error:', err);
    }
  };

  return (
    <section id="utxo" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">UTXO Management</h2>
      <input
        className="w-full border rounded p-2 mb-4"
        type="text"
        placeholder="Dogecoin Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      {/* API key input removed; now set in SettingsPanel and stored in localStorage */}
      <button onClick={handleListUtxos} className="bg-yellow-600 text-white px-6 py-2 rounded font-semibold hover:bg-yellow-700 transition">List UTXOs</button>
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
      {utxos.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Available UTXOs:</h3>
          <ul className="font-mono">
            {utxos.map((utxo, idx) => (
              <li key={idx} className="mb-2">{utxo.txid}:{utxo.vout} - {utxo.value} DOGE</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
