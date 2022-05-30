class Stock { // ES6
    constructor(symbol, company, price) {
        this.symbol = symbol;
        this.company = company;
        this.price = Number(price);
    }

    changePrice(newPrice) {
        this.price = Number(newPrice)
    }
}

let orcl = new Stock("orcl", "Oracle Inc.", 123.45);
console.log(orcl.symbol)
console.log(orcl.company)
console.log(orcl.price)
orcl.quantity = 100000;
delete orcl.quantity
orcl.changePrice(118.73);
console.log(orcl.price)
