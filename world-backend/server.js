const port = 9100;
const mongoose = require("mongoose");

//region express initialization
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const api = express();
api.use(bodyParser.json({
    limit: "5mb"
}))
api.use(logger('dev'));
api.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,POST,PUT,PATCH,DELETE,GET");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
    next();
})
//endregion

//region integration
mongoose.connect("mongodb://localhost:27017/world",{
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});
//endregion

//region Schema
const citySchema = new mongoose.Schema({
   "_id": String,
   "name": String,
   "population": Number
});
const countrySchema = new mongoose.Schema({
    "_id": String,
    "name": String,
    "population": Number,
    "surfaceArea": Number,
    "continent": String,
    "cities": [citySchema]
})

const Country = mongoose.model("countries1", countrySchema);
//endregion

//region rest api
// http://localhost:9100/world/api/v1/continents
api.get("/world/api/v1/continents", async (req,res) => {
    Country.distinct("continent", (err, continents) => {
       res.set("Content-Type", "application/json");
       res.status(200).send(continents);
    });
})

// http://localhost:9100/world/api/v1/countries?continent=Antarctica
// http://localhost:9100/world/api/v1/countries
api.get("/world/api/v1/countries", async (req,res) => {
    const continent = req.query.continent || "Asia";
    Country.find({continent},(err,countries) => {
       res.set("Content-Type", "application/json");
       res.status(200).send(countries);
    });
})


api.listen(port);
console.log(`backend is listening ${port}`);
//endregion

