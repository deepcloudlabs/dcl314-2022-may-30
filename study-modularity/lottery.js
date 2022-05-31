const ASCENDING = 1;
const DESCENDING = 2;

exports.ASCENDING = ASCENDING;

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

exports.get_random_number = get_random_number;

exports.order = {
    ASCENDING: numeric_order(ASCENDING),
    DESCENDING: numeric_order(DESCENDING)
}

exports.get_numbers = function (max = 60, size = 6, order = numeric_order(ASCENDING)) {
    let numbers = [];
    while (numbers.length < size) {
        let candidate = get_random_number(1, max);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort(order);
    return numbers;
}

const Employee = function (fullname, identity, salary) {
    this.fullname = fullname;
    this.identity = identity;
    this.salary = salary;
    this.increaseSalary = function (rate) {
        this.salary = (1. + rate / 100) * this.salary;
    }
}

exports.Employee = Employee;
