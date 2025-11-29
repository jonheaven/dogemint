import { Transaction } from './transaction';
export interface SignTransactionParams {
    transaction: Transaction;
    privateKey: string;
}
export interface SignedTransaction {
    raw: string;
    txid: string;
}
export declare function signTransaction(params: SignTransactionParams): SignedTransaction;
/**
 * This implementation uses doge-sdk for real Dogecoin transaction signing in the browser or frontend.
 * Ensure doge-sdk is installed: npm install doge-sdk
 */
