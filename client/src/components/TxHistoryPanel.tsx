import React, { useState } from 'react';
import Toast from './Toast';
// import { getTxHistory } from 'dogemint/wallet/history'; // Uncomment when implemented

export default function TxHistoryPanel() {
  const [address, setAddress] = useState('');
  const [history, setHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleLoadHistory = () => {
    try {
      // const txs = getTxHistory({ address });
      // setHistory(txs);
      setToastMsg('Transaction history loaded! (Replace with real logic)');
      setShowToast(true);
      console.debug('Transaction history requested for address:', address);
      // Placeholder
      setHistory([
        { txid: 'dummy-txid', date: '2025-11-29', amount: 100, status: 'confirmed' },
      ]);
    } catch (err) {
      setToastMsg('Error loading history: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('History error:', err);
    }
  };

  return (
    <section id="history" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <input
        className="w-full border rounded p-2 mb-4"
        type="text"
        placeholder="Dogecoin Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button onClick={handleLoadHistory} className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition">Load History</button>
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Transactions:</h3>
          <ul className="font-mono">
            {history.map((tx, idx) => (
              <li key={idx} className="mb-2">{tx.txid} - {tx.amount} DOGE - {tx.status} ({tx.date})</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
