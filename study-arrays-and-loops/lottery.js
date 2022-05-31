const ASCENDING = 1;
const DESCENDING = 2;

const numeric_order = (order = ASCENDING) => {
    switch (order) {
        case ASCENDING:
            return (x, y) => x - y;
        case DESCENDING:
            return (x, y) => y - x;
        default:
            return (x, y) => x - y;
    }
}

function get_random_number(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function get_lottery_numbers(max = 60, size = 6) {
    let numbers = [];
    while (numbers.length < size) {
        let candidate = get_random_number(1, max);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort(numeric_order(ASCENDING));
    return numbers;
}

export class Employee {
    constructor(fullname, identity, salary) {
        this.fullname = fullname;
        this.identity = identity;
        this.salary = salary;

    }

    increaseSalary = (rate) => {
        this.salary = (1. + rate / 100) * this.salary;
    }
}