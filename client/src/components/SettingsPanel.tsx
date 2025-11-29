import React, { useState } from 'react';
import Toast from './Toast';
import { configureProvider } from '../../../src/rpc/client';

export default function SettingsPanel() {
  const [provider, setProvider] = useState('rpc');
  const [url, setUrl] = useState('');
  const [authUser, setAuthUser] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSave = () => {
    try {
      configureProvider({
        type: provider,
        url,
        auth: provider === 'rpc' ? { user: authUser, pass: authPass } : undefined,
        apiKey: provider === 'api' ? apiKey : undefined,
      });
      if (provider === 'api' && apiKey) {
        localStorage.setItem('tatumApiKey', apiKey);
      }
      setToastMsg('Provider settings saved and Dogemint config updated!');
      setShowToast(true);
      console.debug('Provider config change:', { provider, url, authUser, authPass, apiKey });
    } catch (err) {
      setToastMsg('Error saving settings: ' + (err instanceof Error ? err.message : String(err)));
      setShowToast(true);
      console.error('Settings error:', err);
    }
  };

  return (
    <section id="settings" className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div>
          <label className="font-semibold mr-2">Provider:</label>
          <select value={provider} onChange={e => setProvider(e.target.value)} className="border rounded p-2">
            <option value="rpc">Node RPC</option>
            <option value="api">Paid API</option>
          </select>
        </div>
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Node/API URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        {provider === 'rpc' && (
          <>
            <input
              className="w-full border rounded p-2"
              type="text"
              placeholder="RPC Username"
              value={authUser}
              onChange={e => setAuthUser(e.target.value)}
            />
            <input
              className="w-full border rounded p-2"
              type="password"
              placeholder="RPC Password"
              value={authPass}
              onChange={e => setAuthPass(e.target.value)}
            />
          </>
        )}
        {provider === 'api' && (
          <input
            className="w-full border rounded p-2"
            type="text"
            placeholder="API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        )}
        <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded font-semibold hover:bg-gray-900 transition">Save Settings</button>
      </form>
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
    </section>
  );
}
