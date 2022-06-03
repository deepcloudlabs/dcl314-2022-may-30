class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
};

Vue.component('utable', {
    props: ['items', 'properties', 'columns'],
    template:
    '<table class="table table-striped">'
        + '<thead>'
            + '<tr>'
            + "<th v-for=\"column in columns\">{{column}}</th>"
            + '</tr>'
        + '</thead>'
        + '<tbody>'
            + '<tr v-for="item in items">'
            + '<td v-for="prop in properties">{{item[prop]}}</td>'
            + '</tr>'
        + '</tbody>'
    + '</table>'
})

var app = new Vue({
    el: '#app',
    data: {
        moves: [],
        movesColumns: ["Guess", "Message"],
        movesProperties: ["guess", "message"],
        secret: 122,
        wins: 0,
        loses: 0,
        guess: 123,
        tries: 0,
        counter: 60
    },
    computed: {
        total: function () {
            return this.loses + this.wins;
        }
    },
    created: function () {
        this.init();
        setInterval(() => {
            this.counter--;
            if (this.counter <= 0) {
                this.loses++;
                this.init(new Move(this.secret, "You lose!"));
            }
        }, 1000);
    },
    methods: {
        createSecret: function () {
            var numbers = [this.createRandomDigit(1, 9)];
            while (numbers.length < 3) {
                var candidate = this.createRandomDigit(0, 9);
                if (numbers.indexOf(candidate) === -1)
                    numbers.push(candidate);
            }
            return Number(numbers.join(''));
        },
        createRandomDigit: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        init: function (move) {
            this.moves = [];
            if (move !== undefined && move !== null) {
                this.moves.push(move);
            }
            this.secret = this.createSecret();
            this.tries = 0;
            this.counter = 60;
        },
        evaluate: function (guess) {
            guess = Array.from(guess.toString());
            let secret = Array.from(this.secret.toString());
            let partialMatch = 0, perfectMatch = 0;
            for (let i in guess) {
                let index = secret.indexOf(guess[i]);
                if (index == -1) continue;
                if (index == i) {
                    perfectMatch++;
                } else {
                    partialMatch++;
                }
            }
            if (partialMatch == 0 && perfectMatch == 0) return "No match!";
            let message = "";
            if (perfectMatch > 0) message = "+" + perfectMatch;
            if (partialMatch > 0) message = message + "-" + partialMatch;
            return message;
        },
        play: function () {
            if (Number(this.guess) === Number(this.secret)) {
                this.wins++;
                this.init(new Move(this.guess, "You win!"));
                return;
            }
            this.tries++;
            if (this.tries > 10) {
                this.loses++;
                this.init(new Move(this.secret, "You lose!"));
                return;
            }
            let message = this.evaluate(this.guess);
            this.moves.push(new Move(this.guess, message));
        }
    }
});