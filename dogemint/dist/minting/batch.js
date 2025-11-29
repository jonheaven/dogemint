"use strict";
// Dogemint: Batch Inscription Logic
// Ported from ord-dogecoin concepts
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchInscribe = batchInscribe;
const inscription_1 = require("./inscription");
function batchInscribe(params) {
    return params.items.map(item => (0, inscription_1.createInscription)(item.contentType, item.data));
}
/**
 * Example usage:
 * const batch = batchInscribe({ items: [
 *   { data: Buffer.from('First'), contentType: 'text/plain' },
 *   { data: Buffer.from('Second'), contentType: 'text/plain' }
 * ] });
 */ 
