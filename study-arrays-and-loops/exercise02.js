// 1. filter/map/reduce
// 2. search
function numeric_order_asc(x, y) { //partial ordering
    if (x < y)
        return -1;
    if (x === y)
        return 0;
    return +1;
}

function numeric_order_simple_asc(x, y) { //partial ordering
    return x - y;
}

function numeric_order_simple_desc(x, y) { //partial ordering
    return y - x;
}

let lotteryNumbers = [];
while (lotteryNumbers.length < 6) {
    let randomNumber = 1 + Math.floor(Math.random() * 60);
    if (!lotteryNumbers.includes(randomNumber))
        lotteryNumbers.push(randomNumber);
}
//lotteryNumbers.sort(numeric_order_simple_desc) // numeric order
lotteryNumbers.sort(function (x, y) {
    return x - y;
});
lotteryNumbers.sort((x, y) => {
    return x - y;
}); // arrow function/lambda expression
lotteryNumbers.sort((x, y) => x - y); // arrow function/lambda expression

console.log(lotteryNumbers)