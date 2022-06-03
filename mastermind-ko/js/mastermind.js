/*
    View: game.html -> html, css (bootstrap)
    ViewModel: mastermind.js -> js
 */
//ES6: class
import {GameStatistics} from "./statistics.js";
import {Move} from "./utility.js";

export class MastermindViewModel { // Knockout's ViewModel
    constructor() {
        this.gameLevel = ko.observable(3);
        this.tries = ko.observable(0);
        this.guess = ko.observable(123);
        this.moves = ko.observableArray([]); // empty array
        this.secret = this.createSecret();
        this.counter = ko.observable(60);
        this.statistics = new GameStatistics();
        this.progressBarClass = ko.computed(() => {
            let clazz = "progress-bar progress-bar-striped progress-bar-animated bg-success";
            if (this.counter() < 20) {
                clazz = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
            } else if (this.counter() < 40) {
                clazz = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
            }
            return clazz;
        });
        this.progressBarWidth = ko.computed(() => {
            return `${10 * this.counter() / 6}%`;
        });
        // this.play = this.play.bind(this);
        setInterval(this.countDown, 1000);
    }

    countDown = () => {
        this.counter(this.counter() - 1);
        if (this.counter() <= 0) {
            this.initGame();
            this.statistics.playerLoses();
        }
    }

    play = () => {
        this.tries(this.tries() + 1);
        if (Number(this.guess()) === this.secret) {
            this.gameLevel(this.gameLevel() + 1);
            if (this.gameLevel() > 10) {
                this.gameLevel(3);
                this.initGame();
                this.statistics.playerWins();
                return "wins";
            }
            this.initGame();
        } else {
            if (this.tries() > 10) {
                this.initGame();
                this.statistics.playerLoses();
                return "loses";
            } else {
                this.moves.push(this.createMove(this.guess()));
            }
        }
    }

    createSecret = () => {
        let digits = []; // [5, 4, 9] -> 549
        digits.push(this.createRandomDigit(1, 9));
        while (digits.length < this.gameLevel()) {
            let randomDigit = this.createRandomDigit(0, 9);
            if (!digits.includes(randomDigit))
                digits.push(randomDigit);
        }
        return digits.reduce((number, digit) => 10 * number + digit, 0);
    }

    createRandomDigit = (min = 0, max = 9) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initGame = () => {
        this.tries(0);
        this.counter(60);
        this.moves([]);
        this.secret = this.createSecret();
    }

    createMove = (guess) => {
        let guessAsString = guess.toString();
        let secretAsString = this.secret.toString();
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < guessAsString.length; ++i) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; ++j) {
                let s = secretAsString.charAt(j);
                if (s === g) {
                    if (i === j) {
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        let message = "";
        if (perfectMatch == 0 && partialMatch == 0) {
            message = "No match";
        } else {
            if (perfectMatch > 0)
                message += "+" + perfectMatch;
            if (partialMatch > 0)
                message += "-" + partialMatch;
        }
        return new Move(guess, message);
    }
}