"use strict";
// Dogemint: UTXO Management
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUtxos = listUtxos;
/**
 * List available UTXOs for an address (stub)
 */
function listUtxos(params) {
    // Real implementation would query RPC/API for UTXOs
    return [
        { txid: 'dummy-txid', vout: 0, value: 100000, address: params.address },
    ];
}
