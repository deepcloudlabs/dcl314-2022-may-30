<template>
  <div class="container">
    <p></p>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">World Card</h4>
      </div>
      <div class="card-body">
        <label class="form-label" for="continent">Continent:</label>
        <select class="form-select" v-model="continent">
          <option v-for="cont in continents" v-bind:key="cont">{{ cont }}</option>
        </select>
        <button @click="getCountriesByContinent" class="btn btn-success">List</button>
      </div>
    </div>
    <p></p>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">World Countries</h4>
        <p></p>
        <span class="badge bg-danger" data-bind="text: population"></span>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-hover table-striped table-responsive">
          <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Population</th>
            <th>Surface Area</th>
            <th>GNP</th>
            <th>Independence Year</th>
            <th>Government Form</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(country,index) in countries" v-bind:key="country._id">
            <td>{{ index + 1 }}</td>
            <td>{{ country.name }}</td>
            <td>{{ country.population }}</td>
            <td>{{ country.surfaceArea }}</td>
            <td>{{ country.gnp }}</td>
            <td>{{ country.indepYear }}</td>
            <td>{{ country.governmentForm }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorldCountries',
  data() {
    return {
      continents: [],
      countries: [],
      continent: "Asia"
    }
  }, created: function () {
    this.getContinents();
  }, methods: {
    getContinents() {
      fetch("http://localhost:9100/world/api/v1/continents", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }).then(res => res.json())
          .then(continents => this.continents = continents)
    },
    getCountriesByContinent() {
      fetch(`http://localhost:9100/world/api/v1/countries?continent=${this.continent}`, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }).then(res => res.json())
          .then(countries => this.countries = countries);
    }
  }
}
</script>

<style>
@import url("bootstrap/dist/css/bootstrap.css");
</style>

