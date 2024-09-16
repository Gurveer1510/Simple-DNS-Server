import * as dgram from "dgram";
import DNSHeaderClass, { DNSHeader, OPCODE, RESPONSE_CODE } from "./dns/header";
import DNSQuestion, { DNSQ, DNSQCLASS, DNSQTYPE } from "./dns/question";

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
    qdcount: 0,
    ancount: 0,
    nscount: 0,
    arcount: 0
}

const defaultQuestion: DNSQ = {
    name: "codecrafters.io",
    type: DNSQTYPE.A,
    classname: DNSQCLASS.IN
}

console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4", () => console.log("message recieved"));
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header = DNSHeaderClass.write({...defaultHeader, qdcount: 1})
        const question = DNSQuestion.write([defaultQuestion])
        const response = Buffer.from(header);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
