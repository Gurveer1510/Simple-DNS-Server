import * as dgram from "dgram";
console.log("Logs from your program will appear here!");
const udpSocket = dgram.createSocket("udp4", () => console.log("message recieved"));
udpSocket.bind(2053, "127.0.0.1");
udpSocket.on("message", (data, remoteAddr) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        console.log(data.toString("utf8"));
        const response = Buffer.from("Thank you for sending msg");
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    }
    catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
