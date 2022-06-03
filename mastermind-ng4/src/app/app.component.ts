import {Component, OnInit} from '@angular/core';
import {Move} from './move';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title: string;
  private guess: number;
  private tries: number;
  private secret: number;
  private gameLevel: number;
  private moves: Move[];

  constructor() {
    this.title = 'Mastermind!';
    this.guess = 123;
    this.tries = 0;
    this.secret = 0;
    this.gameLevel = 3;
    this.moves = [];
  }

  ngOnInit(): void {
    this.secret = this.createSecret();
    console.log(this.secret);
  }

  private createSecret(): number {
    const digits: number[] = [];
    digits.push(this.createDigit(1, 9));
    for (let i = 1; i < this.gameLevel; ++i) {
      let candidate = 0;
      do {
        candidate = this.createDigit(0, 9);
      } while (digits.indexOf(candidate) >= 0);
      digits.push(candidate);
    }
    let value = 0;
    for (let i = 0; i < digits.length; ++i) {
      value = 10 * value + digits[i];
    }
    return value;
  }

  private createDigit(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public play() {
    if (this.secret === this.guess) {
      this.gameLevel++;
      this.tries = 0;
      this.moves.splice(0);
      this.moves.push(new Move(this.guess, 'You win!'));
      this.secret = this.createSecret();
    } else {
      this.tries++;
      const message: string = this.createMessage();
      this.moves.push(new Move(this.guess, message));
    }
  }

  private createMessage(): string {
    const strSecret: string = this.secret.toString();
    const strGuess: string = this.guess.toString();
    let perfectMatch = 0;
    let partialMatch = 0;
    for (let i = 0; i < strSecret.length; ++i) {
      for (let j = 0; j < strGuess.length; ++j) {
        if (strSecret.charAt(i) === strGuess.charAt(j)) {
          if (i === j) {
            ++perfectMatch;
          } else {
            ++partialMatch;
          }
        }
      }
    }
    if (perfectMatch === 0 && partialMatch === 0) {
      return 'No match';
    }
    let message = '';
    if (perfectMatch > 0) {
      message = '+' + perfectMatch;
    }
    if (partialMatch > 0) {
      message += '-' + partialMatch;
    }
    return message;
  }
}
