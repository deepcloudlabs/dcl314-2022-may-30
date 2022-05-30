function Stock(symbol, company, price) {
    this.symbol = symbol;
    this.company = company;
    this.price = Number(price);

    this.changePrice = function (newPrice) {
        this.price = Number(newPrice)
    }
    // return this;
}

let orcl = new Stock("orcl", "Oracle Inc.", 123.45);
console.log(orcl.symbol)
console.log(orcl.company)
console.log(orcl.price)
orcl.changePrice(118.73);
console.log(orcl.price)
