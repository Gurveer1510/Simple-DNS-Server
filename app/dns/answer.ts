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
            const buffer = Buffer.alloc(10 + data.length)
            buffer.writeUInt16BE(type)
            buffer.writeUInt16BE(classname,2)
            buffer.writeUInt16BE(ttl,4)
            buffer.writeUInt16BE(data.length,8)

            return Buffer.concat([...str,Buffer.from([0]), buffer, Buffer.from(data + "\0", "binary")])
        }))
    }
}

export default DNSA