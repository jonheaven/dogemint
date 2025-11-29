export interface RpcConfig {
    type: 'rpc' | 'api';
    url: string;
    auth?: {
        user: string;
        pass: string;
    };
    apiKey?: string;
}
export declare function configureProvider(config: RpcConfig): void;
export declare function getProviderConfig(): RpcConfig | null;
/**
 * Broadcast a signed transaction via RPC or API
 */
/**
 * Broadcast a signed Dogecoin transaction using Tatum API
 */
export declare function broadcastTransaction(params: {
    signedTransaction: {
        raw: string;
    };
    apiKey?: string;
}): Promise<string | null>;
