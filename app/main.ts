import * as dgram from "dgram";
import DNSHeaderClass, { DNSHeader, OPCODE, RESPONSE_CODE } from "./dns/header";
import DNSQuestion, { DNSQ, DNSCLASS, DNSTYPE } from "./dns/question";
import DNSA, { DNSAnwer } from "./dns/answer";

const defaultHeader: DNSHeader = {
    id: 1234,
    qr: 1,
    opcode: OPCODE.STANDARD_QUERY,
    aa: 0,
    tc: 0,
    rd: 0,
    ra: 0,
    z: 0,
    rcode: RESPONSE_CODE.NO_ERROR,
    QCOUNT: 0,
    ancount: 0,
    nscount: 0,
    arcount: 0
}

const defaultQuestion: DNSQ = {
    name: "codecrafters.io",
    type: DNSTYPE.A,
    classname: DNSCLASS.IN
}

const defaultAnswer : DNSAnwer = {
    name: "codecrafters.io",
    type: DNSTYPE.A,
    classname: DNSCLASS.IN,
    ttl: 60,
    data: "8.8.8.8"
}

console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header = DNSHeaderClass.write({...defaultHeader, QCOUNT: 1, ancount: 1})
        const question = DNSQuestion.write([defaultQuestion])
        const answer = DNSA.write([defaultAnswer])
        
        const response = Buffer.concat([header, question, answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
