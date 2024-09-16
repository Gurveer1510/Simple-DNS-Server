export enum DNSQTYPE {
    A = 1,
    NS = 2
}

export enum DNSQCLASS {
    IN = 1
}

export interface DNSQ {
    name: string
    type: DNSQTYPE
    classname: DNSQCLASS
}

class DNSQuestion {
    static write(questions: DNSQ[]) {
        return Buffer.concat(questions.map((question) => {
            const {name, type, classname} = question

            const str = name.split(".").map(label => {
                const length = Buffer.from([label.length])
                return Buffer.concat([length, Buffer.from(label)])
            })

            const typeAndClass = Buffer.alloc(4)
            typeAndClass.writeUInt16BE(type)
            typeAndClass.writeUInt16BE(classname, 2)

            return Buffer.concat([...str,Buffer.from([0]), typeAndClass])
        }))
    }

}

export default DNSQuestion