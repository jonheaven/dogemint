import { Inscription } from './inscription';
export interface BatchInscriptionParams {
    items: Array<{
        data: Buffer;
        contentType: string;
        address?: string;
    }>;
}
export declare function batchInscribe(params: BatchInscriptionParams): Inscription[];
/**
 * Example usage:
 * const batch = batchInscribe({ items: [
 *   { data: Buffer.from('First'), contentType: 'text/plain' },
 *   { data: Buffer.from('Second'), contentType: 'text/plain' }
 * ] });
 */ 
