import {Employee, get_lottery_numbers} from "./lottery.js";

console.log(get_lottery_numbers(100, 5));
let jack = new Employee("jack shephard", "11111111110", 100000);
jack.increaseSalary(70);
console.log(jack);