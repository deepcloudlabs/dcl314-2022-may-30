const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hr",{
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

const departmentSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: false,
        enum: ["IT", "Sales", "Finance", "HR"]
    }
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
    "department": departmentSchema
});

const Employee = mongoose.model("employees",employeeSchema);

exports.Employee = Employee;