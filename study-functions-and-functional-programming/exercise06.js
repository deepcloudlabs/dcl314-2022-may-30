const fs = require("fs");

fs.readFile('countries.json', (err, data) => {
    if (err) throw err;
    let countries = JSON.parse(data);
    // find the country with the highest population of each continent
    let highestPopCountries = {};
    for (let country of countries){
        let {continent, population} = {...country};
        if (highestPopCountries.hasOwnProperty(continent)){
            if (highestPopCountries[continent].population < population)
                highestPopCountries[continent] = country;
        } else {
                highestPopCountries[continent] = country;
        }
    }
    for (let continent in highestPopCountries){
        let highestPopCountry = highestPopCountries[continent];
        console.log(`${continent}\t${highestPopCountry.name}\t${highestPopCountry.population}`)
    }
    // functional programming
    highestPopCountries = countries.reduce((highPopCountries,country) => {
        let {continent, population} = {...country};
        highPopCountries[continent] = highPopCountries[continent] || country ;
        highPopCountries[continent] = highPopCountries[continent].population < population ? country : highPopCountries[continent];
        return highPopCountries;
    }, {});
    for (let continent in highestPopCountries){
        let highestPopCountry = highestPopCountries[continent];
        console.log(`${continent}\t${highestPopCountry.name}\t${highestPopCountry.population}`)
    }
})

// let raw_data = fs.readFileSync('countries.json');