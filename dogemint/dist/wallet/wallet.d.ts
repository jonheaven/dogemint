export interface Wallet {
    address: string;
    privateKey?: string;
}
/**
 * Generate a new Dogecoin address (stub)
 */
export declare function getNewAddress(): string;
/**
 * Get wallet balance (stub)
 */
export declare function getBalance(params: {
    address: string;
}): number;
