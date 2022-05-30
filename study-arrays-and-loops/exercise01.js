array1 = [4, 8, 15, 16, 23, 42]
array2 = new Array(4, 8, 15, 16, 23, 42)

console.log(array1.length) // 6
console.log(array2.length) // 6

console.log(array1[0]) // 4
console.log(array1[5]) // 42

// external loop #1
let sum = 0;
for (let i = 0; i < array1.length; i++) {
    let number = array1[i];
    sum = sum + number;
}
console.log(`sum is ${sum}.`);

// external loop #2
sum = 0;
for (let i in array1) {
    let number = array1[i];
    sum = sum + number;
}
console.log(`sum is ${sum}.`);

// external loop #3
sum = 0;
for (let number of array1) {
    sum = sum + number;
}
console.log(`sum is ${sum}.`);

// internal loop #4: filter/map/reduce + functional programming
function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

// 4,8,15,16,23,42
// add(0,4)   -> 4
// add(4,8)   -> 12
// add(12,15) -> 27
// add(27,16) -> 43 ...
sum = array1.reduce(add, 0);
console.log(`sum is ${sum}.`);
sum = array1.reduce(mul, 1);
console.log(`sum is ${sum}.`);