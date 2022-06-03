import React from "react";
import GameStatistics from "./statistics";
import CardTitle from "./card_title";
import Badge from "./badge";
import Move from "../model/move";

// stateful -> stateless
export default function Mastermind(props) {

    /*
    componentDidMount() {
        let gameState = localStorage.getItem("mastermind-state")
        if (gameState === null || gameState === undefined){
            let state = {...this.state}
            localStorage.setItem("mastermind-state", JSON.stringify(state))
        } else {
            let game = JSON.parse(gameState)
            this.setState(game);
        }
    }
     */

        let tableMoves = "";
        if (props.game.moves.length > 0){
            tableMoves = <table className="table table-striped table-hover table-responsive table-bordered">
                <thead>
                <tr>
                    <th>Guess</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>{
                    props.game.moves.map( move =>
                        <tr key={move.guess}>
                            <td>{move.guess}</td>
                            <td>{move.evaluation.evalstr}</td>
                        </tr>
                    )
                }</tbody>
            </table>;
        }
        let badgeTries = "";
        if (props.game.tries>0){
            badgeTries = <Badge label="Tries" value={props.game.tries} />
        }
        return (
          <div className="container">
              <div className="card">
                  <div className="card-header">
                    <CardTitle title="Game Console" />
                  </div>
                  <div className="card-body">
                      <Badge label="Game Level" value={props.game.gameLevel} />
                      {badgeTries}
                      <Badge label="Secret" value={props.game.secret} />
                      <div className="form-group">
                          <label htmlFor="guess">Guess: </label>
                          <input type="number"
                                 id="guess"
                                 value={props.game.guess}
                                 onChange={props.handleInputGuess}
                                 className="form-control"></input>
                      </div>
                      <div className="form-group">
                          <button  onClick={props.play}
                                   className="btn btn-success">Play</button>
                      </div>
                      <p></p>
                      <div className="form-group">
                          {tableMoves}
                      </div>
                  </div>
              </div>
              <p></p>
              <GameStatistics stats={props.game.statistics} />
          </div>
        );
}