"use strict";
// Dogemint: Real Inscription Creation & Parsing Logic
// Ported from ord-dogecoin (Rust)
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedInscription = exports.PROTOCOL_ID = void 0;
exports.createInscription = createInscription;
exports.parseInscriptionFromScripts = parseInscriptionFromScripts;
exports.PROTOCOL_ID = Buffer.from('ord');
var ParsedInscription;
(function (ParsedInscription) {
    ParsedInscription["None"] = "None";
    ParsedInscription["Partial"] = "Partial";
    ParsedInscription["Complete"] = "Complete";
})(ParsedInscription || (exports.ParsedInscription = ParsedInscription = {}));
function createInscription(contentType, body) {
    return { contentType, body };
}
function parseInscriptionFromScripts(scripts) {
    if (!scripts.length || scripts[0].length === 0)
        return ParsedInscription.None;
    // Decode push datas from first script
    const pushDatas = decodePushDatas(scripts[0]);
    if (!pushDatas || pushDatas.length < 3)
        return ParsedInscription.None;
    // Protocol check
    if (!pushDatas[0].equals(exports.PROTOCOL_ID))
        return ParsedInscription.None;
    // Number of pieces
    let npieces = pushDataToNumber(pushDatas[1]);
    if (npieces === null || npieces === 0)
        return ParsedInscription.None;
    // Content type
    const contentType = pushDatas[2].toString();
    let body = Buffer.alloc(0);
    let remainingPushDatas = pushDatas.slice(3);
    let remainingScripts = scripts.slice(1);
    while (true) {
        while (remainingPushDatas.length >= 2 && npieces > 0) {
            const next = pushDataToNumber(remainingPushDatas[0]);
            if (next !== npieces - 1)
                break;
            body = Buffer.concat([body, remainingPushDatas[1]]);
            remainingPushDatas = remainingPushDatas.slice(2);
            npieces--;
        }
        if (npieces === 0) {
            return { inscription: { contentType, body } };
        }
        if (!remainingScripts.length)
            return ParsedInscription.Partial;
        const nextPushDatas = decodePushDatas(remainingScripts[0]);
        if (!nextPushDatas || nextPushDatas.length < 2)
            return ParsedInscription.None;
        const next = pushDataToNumber(nextPushDatas[0]);
        if (next !== npieces - 1)
            return ParsedInscription.None;
        remainingPushDatas = nextPushDatas;
        remainingScripts = remainingScripts.slice(1);
    }
}
function decodePushDatas(script) {
    // This is a simplified parser for Bitcoin script push datas
    let bytes = script;
    const pushDatas = [];
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
            if (i + 1 + len > bytes.length)
                return null;
            pushDatas.push(bytes.slice(i + 1, i + 1 + len));
            i += 1 + len;
            continue;
        }
        if (opcode === 76) {
            if (i + 2 > bytes.length)
                return null;
            const len = bytes[i + 1];
            if (i + 2 + len > bytes.length)
                return null;
            pushDatas.push(bytes.slice(i + 2, i + 2 + len));
            i += 2 + len;
            continue;
        }
        if (opcode === 77) {
            if (i + 3 > bytes.length)
                return null;
            const len = bytes[i + 1] + (bytes[i + 2] << 8);
            if (i + 3 + len > bytes.length)
                return null;
            pushDatas.push(bytes.slice(i + 3, i + 3 + len));
            i += 3 + len;
            continue;
        }
        if (opcode === 78) {
            if (i + 5 > bytes.length)
                return null;
            const len = bytes[i + 1] + (bytes[i + 2] << 8) + (bytes[i + 3] << 16) + (bytes[i + 4] << 24);
            if (i + 5 + len > bytes.length)
                return null;
            pushDatas.push(bytes.slice(i + 5, i + 5 + len));
            i += 5 + len;
            continue;
        }
        return null;
    }
    return pushDatas;
}
function pushDataToNumber(data) {
    if (data.length === 0)
        return 0;
    if (data.length > 8)
        return null;
    let n = 0;
    for (let i = 0; i < data.length; i++) {
        n |= data[i] << (8 * i);
    }
    return n;
}
