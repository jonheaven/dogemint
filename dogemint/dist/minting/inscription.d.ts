export declare const PROTOCOL_ID: Buffer<ArrayBuffer>;
export interface Inscription {
    contentType: string;
    body: Buffer;
    address?: string;
}
export declare enum ParsedInscription {
    None = "None",
    Partial = "Partial",
    Complete = "Complete"
}
export declare function createInscription(contentType: string, body: Buffer): Inscription;
export declare function parseInscriptionFromScripts(scripts: Buffer[]): ParsedInscription | {
    inscription: Inscription;
};
