// Dogemint: Real Transaction Signing for Dogecoin using doge-sdk
// This implementation uses the npm package 'doge-sdk' for frontend signing


import { Transaction } from './transaction';
import { DogecoinProvider } from '../rpc/provider';

export interface SignTransactionParams {
  transaction: Transaction;
  privateKey: string;
  provider?: DogecoinProvider;
}

export interface SignedTransaction {
  raw: string;
  txid: string;
}

export function signTransaction(params: SignTransactionParams): SignedTransaction {
  const { transaction, privateKey, provider } = params;
  const dogeProvider = provider || DogecoinProvider.getDefault();
  return dogeProvider.signTransaction(transaction, privateKey);
}

/**
 * This implementation now delegates signing to DogecoinProvider for real Dogecoin transaction signing.
 */
