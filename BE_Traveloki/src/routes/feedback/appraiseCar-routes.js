'use strict'

const express = require("express");
const route = express.Router();

const {
  GetAppraiseCar,
  CreateAppraiseCar,
  DeleteAppraiseCar,
} = require("../../controllers/appraiseCar_controller");

route.get("/GetAppraiseCar", GetAppraiseCar);
route.post("/CreateAppraiseCar", CreateAppraiseCar);
route.delete("/DeleteAppraiseCar", DeleteAppraiseCar);

module.exports = route;
