// Functional Programming
// 1. Higher-Order Functions
// 2. Pure Functions
// 3. Generator Function!
// Abstraction Level
// Built-in HoF: filter/map/reduce
function* filter(array, predicate_fun) {
    for (let value of array) {
        if (predicate_fun(value))
            yield value;
    }
}

function* map(array, map_fun) {
    for (let value of array) {
        yield map_fun(value);
    }
}

function reduce(array, reduce_fun, initial_value) {
    let result = initial_value;
    for (let value of array) {
        result = reduce_fun(result, value);
    }
    return result;
}

let circles = [
    {x: 1, y: 1, radius: 100, color: 'red'},
    {x: -1, y: 0, radius: 200, color: 'blue'},
    {x: 0, y: -1, radius: 300, color: 'red'},
    {x: -1, y: -1, radius: 400, color: 'blue'},
    {x: 1, y: 1, radius: 500, color: 'red'}
]
let sum = 0
for (let circle of circles) {
    if (circle.x >= 0 && circle.y >= 0 && "red" == circle.color) {
        let radius = circle.radius;
        let area = Math.PI * radius * radius;
        sum = sum + area;
    }
}
console.log(`Sum of the circle areas in first quadrant: ${sum}`)
let first_quadrant = circle => {
    console.log("first_quadrant")
    return circle.x >= 0 && circle.y >= 0;
}
let redish_circle = circle => {
    console.log("redish_circle")
    return circle.color === "red";
}
let to_circle_area = circle => {
    console.log("to_circle_area")
    return Math.PI * circle.radius * circle.radius;
}
let to_sum = (x, y) => {
    console.log("to_sum")
    return x + y;
}
sum = reduce(map(filter(filter(circles, first_quadrant), redish_circle), to_circle_area), to_sum, 0);
console.log(`Sum of the circle areas in first quadrant: ${sum}`)
