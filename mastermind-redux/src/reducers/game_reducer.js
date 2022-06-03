// reducer: function -> state change
//          i) stateless ii) pure/high-order function -> does not have side-effects
//          inputs: 2 parameters: 1) state 2) action -> event -> command
//          output: return new state
import Move from "../model/move";
import {createSecret, evaluateMove} from "../utils";

const initialState = {
    gameLevel : 3,
    tries: 0,
    secret: createSecret(3),
    moves: [],
    guess : 123,
    statistics: {
        wins: 0,
        loses: 0
    }
};

// export default  function GameReducer(state = initialState,action){
export default  function GameReducer(state ,action){
    if (state === undefined){
        let gameState = localStorage.getItem("master-game");
        let localState;
        if (gameState === null || gameState === undefined) {
            localState = initialState;
            localStorage.setItem("master-game", JSON.stringify(localState));
        } else {
            localState = JSON.parse(gameState);
        }
        return localState;
    }
    let newState = {...state} // clone
    //TODO: action -> change the state
    switch(action.type){
        case "GUESS_CHANGED":
            newState.guess = action.value;
            break;
        case "PLAY":
            newState.tries++;
            if (newState.secret === newState.guess){
                newState.gameLevel++;
                newState.tries = 0;
                newState.moves = [];
                newState.secret = createSecret(newState.gameLevel);
                if (newState.gameLevel>10){
                    newState.statistics.wins++;
                }
            } else {
                if (newState.tries > 10){
                    newState.statistics.loses++;
                    newState.tries = 0;
                    newState.moves = [];
                    newState.secret = createSecret(newState.gameLevel);
                } else {
                    let evaluation = evaluateMove(newState.secret, newState.guess);
                    newState.moves.push(new Move(newState.guess, evaluation));
                }
            }
            break;
    }
    // save newState on localStorage
    localStorage.setItem("master-game", JSON.stringify(newState));
    return newState;
}