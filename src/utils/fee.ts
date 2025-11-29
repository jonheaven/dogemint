// Dogemint: Fee Rate Calculation & Estimation

export interface FeeRate {
  rate: number; // satoshis per byte
}

/**
 * Parse a fee rate from string (e.g., '1.1')
 */
export function parseFeeRate(str: string): FeeRate {
  const rate = parseFloat(str);
  if (!isFinite(rate) || rate <= 0) throw new Error('Invalid fee rate');
  return { rate };
}

/**
 * Estimate fee for a transaction of given vsize (virtual size in bytes)
 */
export function estimateFee(feeRate: FeeRate, vsize: number): number {
  return Math.ceil(feeRate.rate * vsize);
}


/**
 * Fetch dynamic fee rate from Tatum API (Dogecoin)
 */
export async function fetchFeeRateFromTatum(apiKey: string): Promise<FeeRate | null> {
  const url = 'https://api.tatum.io/v3/blockchain/fee/DOGE';
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'accept': 'application/json',
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  // Tatum returns fee per byte in satoshis as 'slow', 'medium', 'fast'
  // We'll use 'medium' for default
  if (typeof data.medium !== 'number') return null;
  return { rate: data.medium };
}

/**
 * Example usage:
 * const feeRate = await fetchFeeRateFromTatum(process.env.TATUM_API_KEY!);
 * const fee = estimateFee(feeRate, 250); // fee in satoshis
 */