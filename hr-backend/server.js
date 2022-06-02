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
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,POST,PUT,PATCH,DELETE,GET");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
    next();
})

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-hr.json");
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//endregion

const hr = require("./hrdb");
const updatableFields = ["salary", "photo", "iban", "fulltime", "department"];

//region rest over http
//  i) Resource-oriented REST API -> Resource Representation : application/json
// ii) RPC-style REST API -> gRPC -> Protocol Buffers (https://grpc.io/)
//                                   (https://www.cncf.io/projects/)
//                                   (https://github.com/grpc/grpc-web)

// http://localhost:8100/hr/api/v1/employees?page=10&size=25
api.get("/hr/api/v1/employees", async (req, res) => {
    const pageNo = Number(req.query.page || 0);
    const pageSize = Number(req.query.size || 10);
    const offset = pageSize * pageNo;
    res.set("Content-Type", "application/json");
    hr.Employee.find({},{},{skip: offset, limit: pageSize})
        .then( employees => res.status(200).send(employees))
        .catch( err => res.status(400).send(err) )
});

api.get("/hr/api/v1/employees/:identity", async (req, res) => {
    const identity = req.params.identity;
    res.set("Content-Type", "application/json");
    hr.Employee.findOne({'identityNo': identity})
               .then( emp => res.status(200).send(emp))
               .catch( err => res.status(400).send(err));
});

api.post("/hr/api/v1/employees", async (req, res) => {
    const hired_employee = req.body;
    hired_employee._id = hired_employee.identityNo;
    const employee = new hr.Employee(hired_employee);
    res.set("Content-Type", "application/json");
    employee.save().then( () => res.status(200).send({"status": "ok"}))
                   .catch( err => res.status(400).send(err) );
})

function updateEmployee(emp, res, identityNo) {
    const updated_emp = {};
    for (let key in emp) {
        if (updatableFields.includes(key))
            updated_emp[key] = emp[key];
    }
    res.set("Content-Type", "application/json");
    hr.Employee.updateOne(
        {identityNo},
        {$set: updated_emp},
        {upsert: false}
    ).then((updateResult) => {
        if (updateResult.modifiedCount > 0)
           res.status(200).send({"status": "ok"});
        else
           res.status(404).send({"status": "failed", "reason": "cannot find the employee."});
    }).catch(err => res.status(400).send(err));
}

api.put("/hr/api/v1/employees/:identity", async (req, res) => {
    const identityNo = req.params.identity;
    const emp = req.body;
    updateEmployee(emp, res, identityNo);
})

api.patch("/hr/api/v1/employees/:identity", async (req, res) => {
    const identityNo = req.params.identity;
    const emp = req.body;
    updateEmployee(emp, res, identityNo);
})

api.delete("/hr/api/v1/employees/:identity", async (req, res) => {
    const identityNo = req.params.identity;
    hr.Employee.findOneAndDelete({identityNo})
               .then(() => res.status(200).send({"status": "ok"}))
               .catch(err => res.status(400).send(err));
});

//endregion

//region rest over websocket

//endregion

api.listen(port);
console.log(`backend is listening ${port}`);