const port = 9100;
const mongoose = require("mongoose");

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
//endregion

//region rest api

//endregion

