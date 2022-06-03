// Before ES6:
export function Move(guess, message) {
    this.guess = guess;
    this.message = message;
}

// ES6: syntactic sugar: class MoveES6 {...} --> function Move(...){...}
class MoveES6 {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}