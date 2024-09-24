const express = require("express");
const route = express.Router();

const { UpdateState } = require("../controller/UpdateState.controller");

route.post("/UpdateState/:id", UpdateState);

module.exports = route;
