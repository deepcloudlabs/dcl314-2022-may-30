import {WebSocket} from "ws";
import {Observable} from "rxjs";
import {bufferCount, map} from "rxjs/operators";

const URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new WebSocket(URL);
const trades = new Observable((observer) => {
    ws.on("message", frame => {
        let trade = JSON.parse(frame);
        observer.next(trade);
    })
});
/*
{
  e: 'trade',
  E: 1653996735930,
  s: 'BTCUSDT',
  t: 1387109658,
  p: '31775.97000000',
  q: '0.00114000',
  b: 10791465376,
  a: 10791465267,
  T: 1653996735929,
  m: false,
  M: true
}
 */
let to_trade = raw_trade => {
    return {"price": Number(raw_trade.p), "quantity": Number(raw_trade.q)};
}
let to_volume = trade => {
    return {...trade, "volume": trade.price * trade.quantity};
}
let bufferedTrades = trades.pipe(bufferCount(200,200))
let shapedTrades = bufferedTrades.pipe(
    map((trades,index) => trades.map(to_trade)),
    map((trades,index) => trades.map(to_volume)),
    map((trades,index) => trades.reduce((sum,trade)=>sum + trade.volume,0)),
    map((volume,index) => volume.toFixed(1))
)
shapedTrades.subscribe(console.log);
