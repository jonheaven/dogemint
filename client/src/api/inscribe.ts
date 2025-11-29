// Inscription API for Dogemint frontend
// Handles file, text, and DRC-20 inscriptions via Tatum

import { broadcastTransaction, listUtxos, getBalance } from './tatum';
import * as Doge from 'doge-sdk';
import { assembleBitcoinScript } from 'doge-sdk/script';
import { SIGHASH_ALL } from 'doge-sdk/transaction/constants';
import { TransactionBuilder } from 'doge-sdk/transaction/builder';
import { addressToOutputScript } from 'doge-sdk/address';

export async function inscribeFile(files: File[], address: string, apiKey: string, feeRate?: number) {
  const utxos = await listUtxos({ address, apiKey });
  const results = [];
  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const chunks = [];
    for (let i = 0; i < data.length; i += 80) {
      chunks.push(data.slice(i, i + 80));
    }
    const outputs = chunks.map(chunk => ({
      value: 0,
      script: assembleBitcoinScript(`OP_RETURN ${Doge.u8ArrayToHex(chunk)}`)
    }));
    const totalInput = utxos.reduce((sum, u) => sum + u.value, 0);
    const fee = 1 * 1e5;
    const change = totalInput - fee;
    if (change < 0) throw new Error('Insufficient balance for fee');
    outputs.push({
      value: change,
      script: addressToOutputScript(address)
    });
    const inputs = utxos.map(u => ({
      hash: u.txid,
      index: u.vout,
      value: u.value,
      lockScript: addressToOutputScript(address),
      signers: [Doge.DogeMemoryWallet.fromWIF(window.localStorage.getItem('dogeWif'), 'doge')],
      sigHashType: SIGHASH_ALL
    }));
    const builder = new TransactionBuilder(inputs, outputs);
    const tx = await builder.finalizeAndSign();
    const raw = tx.toHex();
    const txId = await broadcastTransaction({ signedTransaction: { raw }, apiKey });
    results.push(txId);
  }
  return results;
}

export async function inscribeText(text: string, address: string, apiKey: string, feeRate?: number) {
  const utxos = await listUtxos({ address, apiKey });
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const chunks = [];
  for (let i = 0; i < data.length; i += 80) {
    chunks.push(data.slice(i, i + 80));
  }
  const outputs = chunks.map(chunk => ({
    value: 0,
    script: assembleBitcoinScript(`OP_RETURN ${Doge.u8ArrayToHex(chunk)}`)
  }));
  const totalInput = utxos.reduce((sum, u) => sum + u.value, 0);
  const fee = 1 * 1e5;
  const change = totalInput - fee;
  if (change < 0) throw new Error('Insufficient balance for fee');
  outputs.push({
    value: change,
    script: addressToOutputScript(address)
  });
  const inputs = utxos.map(u => ({
    hash: u.txid,
    index: u.vout,
    value: u.value,
    lockScript: addressToOutputScript(address),
    signers: [Doge.DogeMemoryWallet.fromWIF(window.localStorage.getItem('dogeWif'), 'doge')],
    sigHashType: SIGHASH_ALL
  }));
  const builder = new TransactionBuilder(inputs, outputs);
  const tx = await builder.finalizeAndSign();
  const raw = tx.toHex();
  const txId = await broadcastTransaction({ signedTransaction: { raw }, apiKey });
  return txId;
}

export async function drc20Deploy(tick: string, supply: string, mintLimit: string, decimals: number, address: string, apiKey: string, feeRate?: number) {
  const utxos = await listUtxos({ address, apiKey });
  const payload = JSON.stringify({ p: "drc-20", op: "deploy", tick, max: supply, lim: mintLimit, dec: decimals });
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const chunks = [];
  for (let i = 0; i < data.length; i += 80) {
    chunks.push(data.slice(i, i + 80));
  }
  const outputs = chunks.map(chunk => ({
    value: 0,
    script: assembleBitcoinScript(`OP_RETURN ${Doge.u8ArrayToHex(chunk)}`)
  }));
  const totalInput = utxos.reduce((sum, u) => sum + u.value, 0);
  const fee = 1 * 1e5;
  const change = totalInput - fee;
  if (change < 0) throw new Error('Insufficient balance for fee');
  outputs.push({
    value: change,
    script: addressToOutputScript(address)
  });
  const inputs = utxos.map(u => ({
    hash: u.txid,
    index: u.vout,
    value: u.value,
    lockScript: addressToOutputScript(address),
    signers: [Doge.DogeMemoryWallet.fromWIF(window.localStorage.getItem('dogeWif'), 'doge')],
    sigHashType: SIGHASH_ALL
  }));
  const builder = new TransactionBuilder(inputs, outputs);
  const tx = await builder.finalizeAndSign();
  const raw = tx.toHex();
  const txId = await broadcastTransaction({ signedTransaction: { raw }, apiKey });
  return txId;
}

export async function drc20Mint(tick: string, amount: string, repeat: number | undefined, address: string, apiKey: string, feeRate?: number) {
  const utxos = await listUtxos({ address, apiKey });
  const results = [];
  const count = repeat || 1;
  for (let i = 0; i < count; i++) {
    const payload = JSON.stringify({ p: "drc-20", op: "mint", tick, amt: amount });
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const chunks = [];
    for (let j = 0; j < data.length; j += 80) {
      chunks.push(data.slice(j, j + 80));
    }
    const outputs = chunks.map(chunk => ({
      value: 0,
      script: assembleBitcoinScript(`OP_RETURN ${Doge.u8ArrayToHex(chunk)}`)
    }));
    const totalInput = utxos.reduce((sum, u) => sum + u.value, 0);
    const fee = 1 * 1e5;
    const change = totalInput - fee;
    if (change < 0) throw new Error('Insufficient balance for fee');
    outputs.push({
      value: change,
      script: addressToOutputScript(address)
    });
    const inputs = utxos.map(u => ({
      hash: u.txid,
      index: u.vout,
      value: u.value,
      lockScript: addressToOutputScript(address),
      signers: [Doge.DogeMemoryWallet.fromWIF(window.localStorage.getItem('dogeWif'), 'doge')],
      sigHashType: SIGHASH_ALL
    }));
    const builder = new TransactionBuilder(inputs, outputs);
    const tx = await builder.finalizeAndSign();
    const raw = tx.toHex();
    const txId = await broadcastTransaction({ signedTransaction: { raw }, apiKey });
    results.push(txId);
  }
  return results;
}

export async function drc20Transfer(tick: string, amount: string, repeat: number | undefined, address: string, apiKey: string, feeRate?: number) {
  const utxos = await listUtxos({ address, apiKey });
  const results = [];
  const count = repeat || 1;
  for (let i = 0; i < count; i++) {
    const payload = JSON.stringify({ p: "drc-20", op: "transfer", tick, amt: amount });
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const chunks = [];
    for (let j = 0; j < data.length; j += 80) {
      chunks.push(data.slice(j, j + 80));
    }
    const outputs = chunks.map(chunk => ({
      value: 0,
      script: assembleBitcoinScript(`OP_RETURN ${Doge.u8ArrayToHex(chunk)}`)
    }));
    const totalInput = utxos.reduce((sum, u) => sum + u.value, 0);
    const fee = 1 * 1e5;
    const change = totalInput - fee;
    if (change < 0) throw new Error('Insufficient balance for fee');
    outputs.push({
      value: change,
      script: addressToOutputScript(address)
    });
    const inputs = utxos.map(u => ({
      hash: u.txid,
      index: u.vout,
      value: u.value,
      lockScript: addressToOutputScript(address),
      signers: [Doge.DogeMemoryWallet.fromWIF(window.localStorage.getItem('dogeWif'), 'doge')],
      sigHashType: SIGHASH_ALL
    }));
    const builder = new TransactionBuilder(inputs, outputs);
    const tx = await builder.finalizeAndSign();
    const raw = tx.toHex();
    const txId = await broadcastTransaction({ signedTransaction: { raw }, apiKey });
    results.push(txId);
  }
  return results;
}
