import * as dgram from "dgram";
import DNS, { DNSHeader, OPCODE, RESPONSE_CODE } from "./dns/header";

const defaultHeader: DNSHeader = {
    id: 1234,
    qr: 0,
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
console.log(defaultHeader);

console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4", () => console.log("message recieved"));
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header = DNS.write(defaultHeader)

        console.log(data.toString("utf8"))

        const response = Buffer.from(header);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
