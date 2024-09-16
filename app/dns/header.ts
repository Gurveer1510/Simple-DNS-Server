export enum OPCODE {
    STANDARD_QUERY = 0,
    INVERSE_QUERY = 1
}

export enum RESPONSE_CODE {
    NO_ERROR = 0 ,
    FORMAT_ERROR = 1
}

export interface DNSHeader {
    id: number,
    qr: number,
    opcode : OPCODE,
    aa : number,
    tc : number,
    rd : number,
    ra: number,
    z : number,
    rcode: RESPONSE_CODE,
    qdcount : number,
    ancount: number,
    nscount: number,
    arcount: number
}


class DNSHeaderClass {
    static write(values: DNSHeader){
        const header = Buffer.alloc(12)
        const flags = (values.qr << 15)    // Move QR to the 15th bit
            | (values.opcode << 11) // Move OPCODE to bits 11-14
            | (values.aa << 10)     // Move AA to the 10th bit
            | (values.tc << 9)      // Move TC to the 9th bit
            | (values.rd << 8)      // Move RD to the 8th bit
            | (values.ra << 7)      // Move RA to the 7th bit
            | (values.z << 4)       // Move Z (3 bits) to bits 4-6
            | (values.rcode);   
        header.writeUInt16BE(values.id, 0)
        header.writeUInt16BE(flags, 2)
        header.writeUInt16BE(values.qdcount, 4)
        header.writeUInt16BE(values.ancount, 6)
        header.writeUInt16BE(values.nscount, 8)
        header.writeUInt16BE(values.arcount, 10)

        return header
    }
}

export default DNSHeaderClass