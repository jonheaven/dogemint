export interface UTXO {
    txid: string;
    vout: number;
    value: number;
    address: string;
}
/**
 * List available UTXOs for an address (stub)
 */
export declare function listUtxos(params: {
    address: string;
}): UTXO[];
