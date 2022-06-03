import Mastermind from "./mastermind";
import {connect} from "react-redux";

let mapStateToProps = function(store){
    return {
        // mastermind -> props.game
       game : store.gameStore
    }
}

let mapDispatchToProps = function(dispatch){
    return {
        handleInputGuess: (event) => {
            let value = Number(event.target.value);
            let type= "GUESS_CHANGED"
            dispatch({type, value})
        },
        play: () =>{
            dispatch({type: "PLAY"})
        }
    }  ;
}

let MastermindConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Mastermind);

export default MastermindConnector;