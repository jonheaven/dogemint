import React, { useState } from 'react';
import Toast from './Toast';
import { generateAddress, getBalance } from '../../../src/wallet/wallet';

export default function WalletPanel() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleGenerate = async () => {
    try {
      let apiKey = localStorage.getItem('tatumApiKey') || '';
      if (!apiKey && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TATUM_API_KEY) {
        apiKey = import.meta.env.VITE_TATUM_API_KEY;
      }
      if (!apiKey) {
        setToastMsg('Tatum is default. You can generate a wallet, but you should set your Tatum API key in Settings for full functionality.');
        setShowToast(true);
        // Continue to generate wallet with empty API key (Tatum default)
      }
      const addr = await generateAddress(apiKey);
      setAddress(addr);
      setBalance(null);
      setToastMsg('Wallet generated!');
      setShowToast(true);
      console.debug('Wallet generated:', addr);
    } catch (err) {
      setToastMsg('Error generating wallet: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Wallet error:', err);
    }
  };
  const handleRefreshBalance = async () => {
    try {
      let apiKey = localStorage.getItem('tatumApiKey') || '';
      if (!apiKey && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TATUM_API_KEY) {
        apiKey = import.meta.env.VITE_TATUM_API_KEY;
      }
      if (!address) {
        setToastMsg('No wallet address to check balance for.');
        setShowToast(true);
        return;
      }
      const bal = await getBalance({ address, apiKey });
      setBalance(bal);
      setToastMsg('Balance refreshed!');
      setShowToast(true);
      console.debug('Balance refreshed:', bal);
    } catch (err) {
      setToastMsg('Error refreshing balance: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Balance error:', err);
    }
  };

  return (
    <section id="wallet" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Wallet</h2>
      {/* API key input removed; now set in SettingsPanel and stored in localStorage */}
      <button onClick={handleGenerate} className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition">Generate New Wallet</button>
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
      {address && (
        <div className="mt-4">
          <div className="font-mono text-lg break-all">Address: {address}</div>
          <button onClick={handleRefreshBalance} className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition mt-2">Refresh Balance</button>
          {balance !== null && (
            <div className="font-mono text-lg mt-2">Balance: {balance} DOGE</div>
          )}
        </div>
      )}
    </section>
  );
}
