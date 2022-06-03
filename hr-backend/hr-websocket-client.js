const io = require("socket.io-client");

const ws_client = io.connect("http://localhost:8100");

ws_client.on("connect", () => {
    console.log("connected to the server.");
    ws_client.on("hr-events", event => {
        console.log(event);
    })
});
console.log("Node websocket client is running...");
