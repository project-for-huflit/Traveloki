'use strict'

const express = require("express");
const route = express.Router();

const {
  GetAppraiseBus,
  CreateAppraiseBus,
  DeleteAppraiseBus,
} = require("../../controllers/appraiseBus.controller");

route.get("/GetAppraiseBus", GetAppraiseBus);
route.post("/CreateAppraiseBus", CreateAppraiseBus);
route.delete("/DeleteAppraiseBus/:id", DeleteAppraiseBus);

module.exports = route;
