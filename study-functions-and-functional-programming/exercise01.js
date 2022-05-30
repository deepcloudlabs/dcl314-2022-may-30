let i = 42;

function fun(x, y, z) {
    x = x || 1;
    y = y || 1;
    z = z || 1;
    ++i;
    return x * y + z * i;
}

function gun(x = 1, y = 1, z = 1) { // es6
    return x * y + z;
}

// arrow function / lambda expression
let run = (x = 1, y = 1, z = 1) => x * y + z;

function sun(x, y, z) {
    if (arguments.length != 3)
        throw "You must provide 3 arguments!";
    return x * y + z;
}

console.log(sun())
console.log(sun(3))
console.log(sun(3, 2))
console.log(sun(3, 2, 1))
console.log(sun(3, 2, 1, 4, 5, 6))