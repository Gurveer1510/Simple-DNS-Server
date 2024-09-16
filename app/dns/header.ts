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


class DNS {
    static write(values: DNSHeader){
        const header = Buffer.alloc(12)
        const flags = values.qr | values.opcode | values.aa | values.tc | values.rd | values.rd | values.z | values.rcode
        header.writeUInt16BE(values.id, 0)
        header.writeUInt16BE(flags, 2)
        header.writeUInt16BE(values.qdcount, 4)
        header.writeUInt16BE(values.ancount, 6)
        header.writeUInt16BE(values.nscount, 8)
        header.writeUInt16BE(values.arcount, 10)

        return header
    }
}

export default DNS