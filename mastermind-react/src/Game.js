import React, {Component} from 'react';
import Table from './Table';
import Badge from './Badge';
import Alert from './Alert';
import Button from './Button';
import InputText from './InputText';
import Move from './Move';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: 123, guess: 0, tries: 0, moves: [], wins: 0, loses: 0, total: 0, counter: 60, totalWinTime: 0,
            avgWinTime: 0, validationMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.play = this.play.bind(this);
    }

    tick() {
        this.setState({counter: this.state.counter - 1});
        if (this.state.counter <= 0) {
            this.setState({loses: this.state.loses + 1, total: this.state.total + 1});
            this.initGame("Time is out!");
        }
    }

    componentDidMount() {
        this.initGame();
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleChange(event) {
        this.setState({
            guess: event.target.value
        })
    }

    initGame(message) {
        this.state.moves.splice(0);
        if (message !== undefined)
            this.state.moves.push(new Move(this.state.secret, message));
        this.setState({
            moves: this.state.moves,
            secret: this.createSecret(),
            counter: 60,
            tries: 0
        });
    }

    play() {
        if (!Number.isInteger(Number(this.state.guess))) {
            this.setState({validationMessage: this.state.guess + " is not an integer!"});
            return;
        }
        if (Number(this.state.guess) < 0) {
            this.setState({validationMessage: this.state.guess + " is a negative integer!"});
            return;
        }
        if (this.state.guess.toString().length !== 3) {
            this.setState({validationMessage: this.state.guess + " is not a 3-digit integer!"});
            return;
        }
        for (let i in this.state.moves) {
            let move = this.state.moves[i];
            if (move.guess === this.state.guess) {
                this.setState({validationMessage: "Already played with " + this.state.guess + "!"});
                return;
            }
        }

        this.setState({tries: this.state.tries + 1});

        if (this.state.guess.localeCompare(this.state.secret) === 0) {
            let totalWinTime = this.state.totalWinTime + 60 - this.state.counter;
            let wins = this.state.wins + 1;
            this.setState({
                wins: wins,
                total: this.state.total + 1,
                totalWinTime: totalWinTime,
                avgWinTime: totalWinTime / wins,
                validationMessage: ""
            });
            this.initGame("You win!");
        } else {
            let message = this.createMessage(this.state.guess, this.state.secret);
            this.state.moves.push(new Move(this.state.guess, message));
            this.setState({
                validationMessage: "",
                moves: this.state.moves
            });
        }
    }

    createRandomDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createSecret() {
        let numbers = [this.createRandomDigit(1, 9)];
        while (numbers.length < 3) {
            let candidate = this.createRandomDigit(0, 9);
            if (numbers.indexOf(candidate) === -1) numbers.push(candidate);
        }
        return numbers.join('')
    }

    createMessage(guess, secret) {
        guess = Array.from(guess.toString());
        secret = Array.from(secret.toString());
        let perfectMatch = 0, partialMatch = 0;
        for (let i in guess) {
            let index = secret.indexOf(guess[i]);
            if (index === -1) continue;
            if (index === Number(i)) {
                perfectMatch++;
            } else {
                partialMatch++;
            }
        }
        if (!(perfectMatch || partialMatch)) return "No match.";
        let message = "";
        if (perfectMatch > 0) message = "+" + perfectMatch;
        if (partialMatch > 0) message += "-" + partialMatch;
        return message;
    }

    render() {
        return (
            <div className="container" role="main">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Mastermind Game</h3>
                    </div>
                    <div className="panel-body">
                        <InputText htmlFor="guess" label="Guess" value={this.state.guess} onChange={this.handleChange}/>
                        <Button label="Play" doClick={this.play}/>
                        <Alert valid={this.state.validationMessage.length > 0} message={this.state.validationMessage}/>
                        <Badge label="Tries" value={this.state.tries}/>
                        <Badge label="Counter" value={this.state.counter}/>
                        <Badge label="Wins" value={this.state.wins}/>
                        <Badge label="Loses" value={this.state.loses}/>
                        <Badge label="Total" value={this.state.total}/>
                        <Badge label="Average Win Time" value={this.state.avgWinTime}/>
                    </div>
                </div>
                <Table title="Moves" columns="Guess,Message" values={this.state.moves} properties="guess,message"/>
            </div>
        );
    }
}

export default Game;
