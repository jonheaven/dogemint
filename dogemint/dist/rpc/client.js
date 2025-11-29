"use strict";
// Dogemint: RPC/API Client Abstraction
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureProvider = configureProvider;
exports.getProviderConfig = getProviderConfig;
exports.broadcastTransaction = broadcastTransaction;
let currentConfig = null;
function configureProvider(config) {
    currentConfig = config;
}
function getProviderConfig() {
    return currentConfig;
}
/**
 * Broadcast a signed transaction via RPC or API
 */
/**
 * Broadcast a signed Dogecoin transaction using Tatum API
 */
async function broadcastTransaction(params) {
    // If Tatum API key is provided, use Tatum broadcast endpoint
    if (params.apiKey) {
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
        if (!res.ok)
            return null;
        const data = await res.json();
        // Tatum returns { txId: '...' }
        return data.txId || null;
    }
    // Otherwise, fallback to configured provider (RPC or other API)
    if (!currentConfig)
        throw new Error('Provider not configured');
    // Implement other provider logic here as needed
    return null;
}
