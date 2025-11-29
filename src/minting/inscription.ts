// Dogemint: Real Inscription Creation & Parsing Logic
// Ported from ord-dogecoin (Rust)
import { Buffer } from 'buffer';
import { DogecoinProvider } from '../rpc/provider';

export const PROTOCOL_ID = Buffer.from('ord');

export interface Inscription {
  contentType: string;
  body: Buffer;
  address?: string;
}

export enum ParsedInscription {
  None = 'None',
  Partial = 'Partial',
  Complete = 'Complete',
}

export function createInscription(contentType: string, body: Buffer): Inscription {
  // Delegate to provider for chain-dependent inscription creation
  const provider = DogecoinProvider.getDefault();
  return provider.createInscription(contentType, body);
}

export function parseInscriptionFromScripts(scripts: Buffer[]): ParsedInscription | { inscription: Inscription } {
  if (!scripts.length || scripts[0].length === 0) return ParsedInscription.None;

  // Decode push datas from first script
  const pushDatas = decodePushDatas(scripts[0]);
  if (!pushDatas || pushDatas.length < 3) return ParsedInscription.None;

  // Protocol check
  if (!pushDatas[0].equals(PROTOCOL_ID)) return ParsedInscription.None;

  // Number of pieces
  let npieces = pushDataToNumber(pushDatas[1]);
  if (npieces === null || npieces === 0) return ParsedInscription.None;

  // Content type
  const contentType = pushDatas[2].toString();
  let body = Buffer.alloc(0);
  let remainingPushDatas = pushDatas.slice(3);
  let remainingScripts = scripts.slice(1);

  while (true) {
    while (remainingPushDatas.length >= 2 && npieces > 0) {
      const next = pushDataToNumber(remainingPushDatas[0]);
      if (next !== npieces - 1) break;
      body = Buffer.concat([body, remainingPushDatas[1]]);
      remainingPushDatas = remainingPushDatas.slice(2);
      npieces--;
    }
    if (npieces === 0) {
      // Use provider for chain-dependent parsing if needed
      const provider = DogecoinProvider.getDefault();
      return { inscription: provider.createInscription(contentType, body) };
    }
    if (!remainingScripts.length) return ParsedInscription.Partial;
    const nextPushDatas = decodePushDatas(remainingScripts[0]);
    if (!nextPushDatas || nextPushDatas.length < 2) return ParsedInscription.None;
    const next = pushDataToNumber(nextPushDatas[0]);
    if (next !== npieces - 1) return ParsedInscription.None;
    remainingPushDatas = nextPushDatas;
    remainingScripts = remainingScripts.slice(1);
  }
}

function decodePushDatas(script: Buffer): Buffer[] | null {
  // This is a simplified parser for Bitcoin script push datas
  let bytes = script;
  const pushDatas: Buffer[] = [];
  let i = 0;
  while (i < bytes.length) {
    const opcode = bytes[i];
    if (opcode === 0) {
      pushDatas.push(Buffer.alloc(0));
      i++;
      continue;
    }
    if (opcode >= 81 && opcode <= 96) {
      pushDatas.push(Buffer.from([opcode - 80]));
      i++;
      continue;
    }
    if (opcode >= 1 && opcode <= 75) {
      const len = opcode;
      if (i + 1 + len > bytes.length) return null;
      pushDatas.push(bytes.slice(i + 1, i + 1 + len));
      i += 1 + len;
      continue;
    }
    if (opcode === 76) {
      if (i + 2 > bytes.length) return null;
      const len = bytes[i + 1];
      if (i + 2 + len > bytes.length) return null;
      pushDatas.push(bytes.slice(i + 2, i + 2 + len));
      i += 2 + len;
      continue;
    }
    if (opcode === 77) {
      if (i + 3 > bytes.length) return null;
      const len = bytes[i + 1] + (bytes[i + 2] << 8);
      if (i + 3 + len > bytes.length) return null;
      pushDatas.push(bytes.slice(i + 3, i + 3 + len));
      i += 3 + len;
      continue;
    }
    if (opcode === 78) {
      if (i + 5 > bytes.length) return null;
      const len = bytes[i + 1] + (bytes[i + 2] << 8) + (bytes[i + 3] << 16) + (bytes[i + 4] << 24);
      if (i + 5 + len > bytes.length) return null;
      pushDatas.push(bytes.slice(i + 5, i + 5 + len));
      i += 5 + len;
      continue;
    }
    return null;
  }
  return pushDatas;
}

function pushDataToNumber(data: Buffer): number | null {
  if (data.length === 0) return 0;
  if (data.length > 8) return null;
  let n = 0;
  for (let i = 0; i < data.length; i++) {
    n |= data[i] << (8 * i);
  }
  return n;
}
