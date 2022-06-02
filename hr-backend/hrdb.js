const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hr",{
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

const validators = require("./custom-validators");

const employeeSchema = new mongoose.Schema({
    "_id": String ,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        validate: [validators.tcKimlikNoValidator, "You must provide a valid identity no!"]
    },
    "photo": {
        type: String,
        required: false
        // maxLength: 128000
    },
    "salary": {
        type: Number,
        required: true,
        min: 4500,
        default: 4500
    },
    "iban": {
        type: String,
        required: true,
        validate: [validators.ibanValidator, "You must provide a valid iban!"]
    },
    "department": {
        type: String,
        required: true,
        enum: ["IT", "Sales", "Finance", "HR"]
    },
    "birthYear": {
        "type": "number",
        "required": true,
        max : 2004
    },
    "fulltime": {
        "type": "boolean",
        "required": true,
        "default": true
    }
});

const Employee = mongoose.model("employees",employeeSchema);

exports.Employee = Employee;