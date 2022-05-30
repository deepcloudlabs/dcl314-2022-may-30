// Functional Programming
// 1. Higher-Order Functions
// 2. Pure Functions
// 3. Generator Function!
// Abstraction Level
// Built-in HoF: filter/map/reduce
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
sum =
    circles.filter(circle => circle.x >= 0)
        .filter(circle => circle.y >= 0)
        .filter(circle => circle.color === "red")
        .map(circle => circle.radius)
        .map(radius => Math.PI * radius * radius)
        .reduce((x, y) => x + y, 0)
console.log(`Sum of the circle areas in first quadrant: ${sum}`)
