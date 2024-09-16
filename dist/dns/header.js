export var OPCODE;
(function (OPCODE) {
    OPCODE[OPCODE["STANDARD_QUERY"] = 0] = "STANDARD_QUERY";
    OPCODE[OPCODE["INVERSE_QUERY"] = 1] = "INVERSE_QUERY";
})(OPCODE || (OPCODE = {}));
export var RESPONSE_CODE;
(function (RESPONSE_CODE) {
    RESPONSE_CODE[RESPONSE_CODE["NO_ERROR"] = 0] = "NO_ERROR";
    RESPONSE_CODE[RESPONSE_CODE["FORMAT_ERROR"] = 1] = "FORMAT_ERROR";
})(RESPONSE_CODE || (RESPONSE_CODE = {}));
class DNS {
    static write(values) {
        const header = Buffer.alloc(12);
        const flags = values.qr | values.opcode | values.aa | values.tc | values.rd | values.rd | values.z | values.rcode;
        header.writeUInt16BE(values.id, 0);
        header.writeUInt16BE(flags, 2);
        header.writeUInt16BE(values.qdcount, 4);
        header.writeUInt16BE(values.ancount, 6);
        header.writeUInt16BE(values.nscount, 8);
        header.writeUInt16BE(values.arcount, 10);
        return header;
    }
}
export default DNS;
