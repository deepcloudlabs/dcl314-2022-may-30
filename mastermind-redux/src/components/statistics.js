import React from "react";
import CardTitle from "./card_title";
/*
   Component ->   i. class (stateful)
            (New)ii. functional (react hooks)(stateful)
                iii. function (stateless)
*/
// Stateless Component -> function
// state -> props (properties): wins and loses
// properties are read-only!
// property: i) value, ii) function, lambda expression
// this.state -> mutable
export default function GameStatistics(props) {
    return (
        <div className="card">
            <div className="card-header">
                <CardTitle title="Game Statistics" />
            </div>
            <div className="card-body">
                <h3>Wins: {props.stats.wins}</h3>
                <h3>Loses: {props.stats.loses}</h3>
            </div>
        </div>
    )
}