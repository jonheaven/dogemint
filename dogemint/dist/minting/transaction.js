"use strict";
// Dogemint: Transaction Building & Signing Logic
// Ported and refactored from ord-dogecoin concepts
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInscriptionTransaction = buildInscriptionTransaction;
exports.signTransaction = signTransaction;
/**
 * Build a transaction for a Doginal inscription
 */
function buildInscriptionTransaction(params) {
    // Select UTXOs and build outputs
    // For now, just a stub; real implementation will use UTXO selection and fee calculation
    const { inscription, utxos, feeRate = 1 } = params;
    const input = utxos[0];
    const outputValue = input.value - 1000 * feeRate; // Example fee
    return {
        inputs: [input],
        outputs: [{ address: inscription.address || input.address, value: outputValue }],
        inscription,
    };
}
/**
 * Sign a transaction (stub)
 */
function signTransaction(params) {
    // Real implementation would use Dogecoin-compatible signing
    // Here, just return a stub
    return {
        raw: 'signed-raw-tx',
        txid: 'dummy-txid',
    };
}
/**
 * Example usage:
 * const tx = buildInscriptionTransaction({ inscription, utxos });
 * const signedTx = signTransaction({ transaction: tx, privateKey });
 */
