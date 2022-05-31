const fs = require("fs");

fs.readFile('countries.json', (err, data) => {
    if (err) throw err;
    let countries = JSON.parse(data);
    // total population of asian countries
    let total_population = 0;
    for (let country of countries) {
        if (country.continent === "Asia") {
            total_population = total_population + Number(country.population);
        }
    }
    console.log(total_population)
    let is_asian = country => country.continent === "Asia";
    let to_population = country => country.population;
    let to_sum = (x, y) => x + y;
    total_population = countries.filter(is_asian).map(to_population).reduce(to_sum);
    console.log(total_population)
})

// let raw_data = fs.readFileSync('countries.json');