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
//endregion

const hr = require("./hrdb");

//region rest over http
//  i) Resource-oriented REST API -> Resource Representation : application/json
// ii) RPC-style REST API -> gRPC -> Protocol Buffers (https://grpc.io/)
//                                   (https://www.cncf.io/projects/)
//                                   (https://github.com/grpc/grpc-web)

// http://localhost:8100/hr/api/v1/employees?page=10&size=25
api.get("/hr/api/v1/employees", async (req, res) => {
    const pageNo = Number(req.query.page) || 0;
    const pageSize = Number(req.query.size) || 10;
    if (!Number.isFinite(pageNo) || !Number.isFinite(pageSize))
        res.status(400).send({status: "failed", reason: "page is invalid"});
});

api.get("/hr/api/v1/employees/:identity", async (req, res) => {
});

api.post("/hr/api/v1/employees", async (req, res) => {
})

api.put("/hr/api/v1/employees/:identity", async (req, res) => {
})

api.patch("/hr/api/v1/employees/:identity", async (req, res) => {
})

api.delete("/hr/api/v1/employees/:identity", async (req, res) => {
});

//endregion

//region rest over websocket

//endregion

api.listen(port);
console.log(`backend is listening ${port}`);