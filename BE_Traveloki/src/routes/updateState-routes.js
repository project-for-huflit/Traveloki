'use strict'

const express = require("express");
const route = express.Router();

const { UpdateState } = require("../controllers/updateState_controller");

route.post("/UpdateState/:id", UpdateState);

module.exports = route;
