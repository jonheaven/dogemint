import { Inscription } from './inscription';
export interface UTXO {
    txid: string;
    vout: number;
    value: number;
    address: string;
}
export interface Transaction {
    inputs: UTXO[];
    outputs: {
        address: string;
        value: number;
    }[];
    inscription?: Inscription;
    raw?: string;
}
export interface SignedTransaction {
    raw: string;
    txid: string;
}
/**
 * Build a transaction for a Doginal inscription
 */
export declare function buildInscriptionTransaction(params: {
    inscription: Inscription;
    utxos: UTXO[];
    feeRate?: number;
}): Transaction;
/**
 * Sign a transaction (stub)
 */
export declare function signTransaction(params: {
    transaction: Transaction;
    privateKey: string;
}): SignedTransaction;
/**
 * Example usage:
 * const tx = buildInscriptionTransaction({ inscription, utxos });
 * const signedTx = signTransaction({ transaction: tx, privateKey });
 */
