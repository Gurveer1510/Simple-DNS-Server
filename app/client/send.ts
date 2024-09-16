import * as dgram from "dgram"
const client : dgram.Socket = dgram.createSocket("udp4")
const message : Buffer = Buffer.from("Hello UDP server")

client.send(message, 2053, '127.0.0.1', (err) => {
    if (err) {
        console.log(err)
        client.close()
    }
})
client.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        console.log(data.toString("utf8"))
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
})