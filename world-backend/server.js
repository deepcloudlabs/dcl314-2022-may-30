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
//endregion

//region rest api

//endregion

