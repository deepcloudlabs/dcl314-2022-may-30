import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import Mastermind from "./components/mastermind";
import UserWins from "./components/user-wins";
import UserLoses from "./components/user-loses";
import {Route, BrowserRouter as Router} from "react-router-dom"
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import GameReducer from "./reducers/game_reducer";
import MastermindConnector from "./components/mastermind_connector";
// reducer: function -> state change
//          i) stateless ii) pure/high-order function -> does not have side-effects
//          inputs: 2 parameters: 1) state 2) action -> event -> command
//          output: return new state
// reducer -> updates state -> (state, action)
let reducers = combineReducers({gameStore: GameReducer},{})
let store = createStore(reducers);

// 1. Mastermind --> stateful function component
// 2. Feature: 1 min
const routing = (
   <Provider store={store}>
    <Router>
        <Route path="/" exact component={MastermindConnector}></Route>
        <Route path="/wins" component={UserWins}></Route>
        <Route path="/loses" component={UserLoses}></Route>
    </Router>
   </Provider>
)
ReactDOM.render(
  <React.StrictMode>
      {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
