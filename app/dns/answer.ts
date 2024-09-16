import { DNSTYPE } from "./question";
import { DNSCLASS } from "./question";

export interface DNSAnwer {
    name: string
    type: DNSTYPE
    classname: DNSCLASS
    ttl: number
    data: string
}

class DNSA {
    static write(answers: DNSAnwer[]){
        return Buffer.concat(answers.map(ans => {

            const {name, type, classname, ttl, data} = ans

            const str = name.split(".").map(n => {

                const length = Buffer.from([n.length])
                return Buffer.concat([length,Buffer.from(n)])

            })

            const ipParts = data.split('.').map(octet => parseInt(octet, 10));
            const ipBuffer = Buffer.from(ipParts); 

            const buffer = Buffer.alloc(10 + data.length)
            buffer.writeUInt16BE(type)
            buffer.writeUInt16BE(classname,2)
            buffer.writeUInt16BE(ttl,4)
            buffer.writeUInt16BE(ipBuffer.length,8)

            return Buffer.concat([...str,Buffer.from([0]), buffer, ipBuffer])
        }))
    }
}

export default DNSA