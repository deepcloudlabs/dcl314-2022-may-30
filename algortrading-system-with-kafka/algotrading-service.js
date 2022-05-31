const Kafka = require('node-rdkafka');
const stream = new Kafka.createReadStream({
    'group.id': 'algotrading',
    'bootstrap.servers': "127.0.0.1",
    'enable.auto.commit': true
}, {}, {"topics": ["trades"]});
const rxjs = require("rxjs");
const operators = require("rxjs/operators");

const trades = new rxjs.Observable((observer) => {
    stream.on('data', async (message) => {
        observer.next(JSON.parse(message.value.toString()));
    });

});
let to_trade = raw_trade => {
    return {"price": Number(raw_trade.p), "quantity": Number(raw_trade.q)};
}
let to_volume = trade => {
    return {...trade, "volume": trade.price * trade.quantity};
}
let bufferedTrades = trades.pipe(operators.bufferCount(200, 200))
let shapedTrades = bufferedTrades.pipe(
    operators.map((trades, index) => trades.map(to_trade)),
    operators.map((trades, index) => trades.map(to_volume)),
    operators.map((trades, index) => trades.reduce((sum, trade) => sum + trade.volume, 0)),
    operators.map((volume, index) => volume.toFixed(1))
)
shapedTrades.subscribe(console.log);


