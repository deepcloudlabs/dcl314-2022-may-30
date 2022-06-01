const departmentSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: false,
        enum: ["IT", "Sales", "Finance", "HR"]
    }
});

const validators = require("customer-validators");
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
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

exports.employeeSchema = employeeSchema;