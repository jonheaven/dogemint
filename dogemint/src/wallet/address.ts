import { generateAddress } from 'doge-sdk';

export function getAddress(): string {
  // Use doge-sdk to generate a Dogecoin address
  return generateAddress();
}
