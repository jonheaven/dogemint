export interface FeeRate {
    rate: number;
}
/**
 * Parse a fee rate from string (e.g., '1.1')
 */
export declare function parseFeeRate(str: string): FeeRate;
/**
 * Estimate fee for a transaction of given vsize (virtual size in bytes)
 */
export declare function estimateFee(feeRate: FeeRate, vsize: number): number;
/**
 * Fetch dynamic fee rate from Tatum API (Dogecoin)
 */
export declare function fetchFeeRateFromTatum(apiKey: string): Promise<FeeRate | null>;
/**
 * Example usage:
 * const feeRate = await fetchFeeRateFromTatum(process.env.TATUM_API_KEY!);
 * const fee = estimateFee(feeRate, 250); // fee in satoshis
 */ 
