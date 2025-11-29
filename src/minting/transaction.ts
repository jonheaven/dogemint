// Dogemint: Transaction Building & Signing Logic
// Ported and refactored from ord-dogecoin concepts

import { Inscription } from './inscription';
import { DogecoinProvider } from '../rpc/provider';

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  address: string;
}

export interface Transaction {
  inputs: UTXO[];
  outputs: { address: string; value: number }[];
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
export interface BuildInscriptionTransactionParams {
  inscription: Inscription;
  utxos: UTXO[];
  feeRate?: number;
  provider?: DogecoinProvider;
}

export function buildInscriptionTransaction(params: BuildInscriptionTransactionParams): Transaction {
  const { inscription, utxos, feeRate = 1, provider } = params;
  const dogeProvider = provider || DogecoinProvider.getDefault();
  // Use provider for UTXO selection and fee calculation
  const selected = dogeProvider.selectUtxos(utxos, feeRate);
  const outputs = dogeProvider.buildOutputs(inscription, selected, feeRate);
  return {
    inputs: selected,
    outputs,
    inscription,
  };
}

/**
 * Sign a transaction
 */
export interface SignTransactionParams {
  transaction: Transaction;
  privateKey: string;
  provider?: DogecoinProvider;
}

export function signTransaction(params: SignTransactionParams): SignedTransaction {
  const { transaction, privateKey, provider } = params;
  const dogeProvider = provider || DogecoinProvider.getDefault();
  return dogeProvider.signTransaction(transaction, privateKey);
}

/**
 * Example usage:
 * const tx = buildInscriptionTransaction({ inscription, utxos });
 * const signedTx = signTransaction({ transaction: tx, privateKey });
 */
