class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    area() {
        throw new Error("You must override area()!")
    }

    circumference() {
        throw new Error("You must override circumference()!")
    }
}

class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = Number(radius);
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }

    circumference() {
        return Math.PI * 2.0 * this.radius;
    }
}

class Square extends Shape {
    constructor(x, y, edge) {
        super(x, y);
        this.edge = edge;
    }

    area() {
        return this.edge * this.edge;
    }

    circumference() {
        return 4.0 * this.edge;
    }
}

class CircleUI extends Circle {
    constructor(x, y, radius, color, thickness) {
        super(x, y, radius);
        this.color = color;
        this.thickness = thickness;
    }

    draw() {
        console.log(`Drawing circle with color ${this.color} and thickness ${this.thickness}`);
    }
}

let blueCircle = new CircleUI(0, 0, 100, 'blue', 2.5);
blueCircle.draw();
console.log(`Area: ${blueCircle.area()}`)
console.log(`Circumference: ${blueCircle.circumference()}`)
