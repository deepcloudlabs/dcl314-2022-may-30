class Employee {
    constructor(identity, fullname, salary) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        // this.sayHello = this.sayHello.bind(this);
    }

    sayHello = () => {
        console.log(this);
        console.log(`Hello, ${this.fullname}!`);
    }
}

let jack = new Employee("11111111110", "jack shephard", 100000);
jack.sayHello();

setTimeout(jack.sayHello, 3000);