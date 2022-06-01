class WorldViewModel {
    constructor() {
        this.continents = ko.observableArray([]);
        this.continent = ko.observable();
        this.countries = ko.observableArray([]);
        this.population = ko.computed(() => {
           return this.countries().map(country => country.population)
                                  .reduce((x,y)=>x+y, 0);
        });

        fetch("http://localhost:9100/world/api/v1/continents",{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then( res => res.json())
          .then( continents => this.continents(continents));
    }

    getContinentCountries = () => {
        fetch(`http://localhost:9100/world/api/v1/countries?continent=${this.continent()}`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then( res => res.json())
            .then( countries => this.countries(countries));
    }
}
let worldViewModel = new WorldViewModel();
window.onload = function(){
    ko.applyBindings(worldViewModel);
}