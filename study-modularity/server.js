let lottery = require("./lottery")

console.log(lottery.get_numbers(100, 5, lottery.order.ASCENDING));
console.log(lottery.get_numbers(100, 5, lottery.order.DESCENDING));

let jack = new lottery.Employee("jack shephard", "11111111110", 100000);
jack.increaseSalary(70);
console.log(jack);
