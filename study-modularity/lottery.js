const ASCENDING = 1;
const DESCENDING = 2;

const numeric_order = (order=ASCENDING) => {
    switch (order) {
        case ASCENDING:
            return (x,y) => x-y;
        case DESCENDING:
            return (x,y) => y-x;
        default:
            return (x,y) => x-y;
    }
}


exports.get_numbers = function get_lottery_numbers(max = 60, size = 6) {
    function get_random_number(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    let numbers = [];
    while (numbers.length < size) {
        let candidate = get_random_number(1, max);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort(numeric_order(ASCENDING));
    return numbers;
}