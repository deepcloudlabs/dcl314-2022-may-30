const port = 8100;

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
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hr",{
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});
//endregion
const schemas = require("mongo-schemas");
const Employee = mongoose.model("employees",schemas.employeeSchema);

//region rest over http

//endregion

//region rest over websocket

//endregion

api.listen(port);
console.log(`backend is listening ${port}`);