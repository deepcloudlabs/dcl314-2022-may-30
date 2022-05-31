// ./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic trades --from-beginning

const WebSocket = require("ws");
const {Producer} = require("node-rdkafka");

const URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new WebSocket(URL);

let create_producer = () => {
    const producer = new Producer({'bootstrap.servers': "127.0.0.1"});
    return new Promise((resolve, reject) => {
        producer
            .on('ready', () => resolve(producer))
            .on('delivery-report', () => {
            })
            .on('event.error', (err) => {
                console.warn('event.error', err);
                reject(err);
            });
        producer.connect();
    });
};
ws.on("open", async () => {
    const trade_producer = await create_producer();
    ws.on("message", frame => {
        let value = new Buffer(frame);
        trade_producer.produce("trades", null, value, "btcusdt");
    })
});
