export function createRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createSecret(level) {
    let digits = [createRandomDigit(1, 9)];
    while (digits.length < level) {
        let digit = createRandomDigit(0, 9);
        if (!digits.includes(digit))
            digits.push(digit);
    }
    return digits.reduce((number, digit) => 10 * number + digit, 0);
}

export function evaluateMove(secret, guess) {
    let secretAsString = secret.toString();
    let guessAsString = guess.toString();
    let perfectMatch = 0;
    let partialMatch = 0;
    for (let i = 0; i < secretAsString.length; i++) {
        let s = secretAsString.charAt(i);
        for (let j = 0; j < guessAsString.length; j++) {
            let g = guessAsString.charAt(j);
            if (s === g) {
                if (i === j) {
                    perfectMatch++;
                } else {
                    partialMatch++;
                }
            }
        }
    }
    let evalstr = ""
    if (perfectMatch === 0 && partialMatch === 0) {
        evalstr = "No match";
    } else {
        if (partialMatch > 0)
            evalstr = `-${partialMatch}`;
        if (perfectMatch > 0)
            evalstr += `+${perfectMatch}`;
    }
    return {perfectMatch, partialMatch, evalstr}
}