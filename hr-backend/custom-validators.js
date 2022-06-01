const MAX = 999999999;
const MODULUS = 97;

function calculateModulus(code) {
    let reformattedCode = code.substring(4) + code.substring(0, 4);
    reformattedCode = reformattedCode.replace(/[A-Z]/g, function (match) {
        return match.charCodeAt(0) - 55;
    });
    let total = 0;
    for (let i = 0; i < reformattedCode.length; i++) {
        let charValue = reformattedCode.charCodeAt(i) - 48;
        if (charValue < 0 || charValue > 35) {
            return 0;
        }
        total = (Number(charValue) > 9 ? total * 100 : total * 10) + charValue;
        if (total < MAX) {
            total = (total % MODULUS);
        }
    }
    return total % MODULUS;
}

function ibanValidator(value) {
    if (value === undefined || value.length < 5) {
        throw "This is not a valid IBAN!"
    }
    let modulusResult = calculateModulus(value);
    return modulusResult === 1;
}

function tcKimlikNoValidator(value) {
    if (value.match("^\\d{11}$") == null) {
        return false;
    }
    let digits = new Array(11);
    for (let i = 0; i < digits.length; ++i) {
        digits[i] = value.charCodeAt(i) - 48;
        if (digits[i] < 0 || digits[i] > 9) {
            return false;
        }
    }
    let x = digits[0];
    let y = digits[1];
    for (let i = 1; i < 5; i++) {
        x += Number(digits[2 * i]);
    }
    for (let i = 2; i <= 4; i++) {
        y += Number(digits[2 * i - 1]);
    }
    let c1 = 7 * x - y;
    if (c1 % 10 !== digits[9]) {
        return false;
    }
    let c2 = 0;
    for (let i = 0; i < 10; ++i) {
        c2 += digits[i];
    }
    return (c2 % 10 === digits[10]);
}

exports.tcKimlikNoValidator = tcKimlikNoValidator;
exports.ibanValidator = ibanValidator;
