import React, { useState } from 'react';
import Toast from './Toast';
import { batchInscribe } from '../../../src/minting/batch';
import { DogecoinProvider } from '../../../src/rpc/provider';

export default function BatchMintPanel() {
  const [items, setItems] = useState([{ data: '', contentType: 'text/plain', address: '' }]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleAdd = () => {
    setItems([...items, { data: '', contentType: 'text/plain', address: '' }]);
  };

  const handleChange = (idx: number, field: string, value: string) => {
    const newItems = items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const handleBatchMint = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const provider = DogecoinProvider.getDefault();
      // Use Dogemint batch minting logic
      const batch = batchInscribe({
        items: items.map(item => ({
          data: Buffer.from(item.data),
          contentType: item.contentType,
          address: item.address,
        })),
        provider,
      });
      console.debug('Batch inscriptions created:', batch);
      setToastMsg('Batch mint transaction sent! (Replace with real chain logic)');
      setShowToast(true);
    } catch (err) {
      setToastMsg('Error batch minting: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Batch mint error:', err);
    }
  };

  return (
    <section id="batch" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Batch Mint Doginals</h2>
      <form onSubmit={handleBatchMint} className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2 border-b pb-4 mb-4">
            <textarea
              className="w-full border rounded p-2"
              rows={2}
              placeholder="Data to inscribe"
              value={item.data}
              onChange={e => handleChange(idx, 'data', e.target.value)}
            />
            <input
              className="w-full border rounded p-2"
              type="text"
              placeholder="Content Type"
              value={item.contentType}
              onChange={e => handleChange(idx, 'contentType', e.target.value)}
            />
            <input
              className="w-full border rounded p-2"
              type="text"
              placeholder="Destination Address"
              value={item.address}
              onChange={e => handleChange(idx, 'address', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAdd} className="bg-gray-200 px-4 py-2 rounded font-semibold mr-2">Add Another</button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">Batch Mint</button>
      </form>
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
    </section>
  );
}
