'use strict'

const express = require("express");
const route = express.Router();

const {
  GetLichSuXeBus,
  CreateLichSuBus,
  DeleteLichSuXeBus,
} = require("../../controllers/historyBus_controller");

route.get("/GetHistoryBus", GetLichSuXeBus);
route.post("/CreateHistoryBus", CreateLichSuBus);
route.delete("/DeleteHistoryBus", DeleteLichSuXeBus);

module.exports = route;
