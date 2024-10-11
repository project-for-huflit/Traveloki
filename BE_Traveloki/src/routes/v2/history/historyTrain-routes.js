'use strict'

const express = require("express");
const route = express.Router();

const {
  GetLichSuDatTau,
  DeleteLichSuDatTau,
  CreateHistoryTrain,
} = require("../../controllers/historyTrain_controller");

route.get("/GetLichSuDatTau", GetLichSuDatTau);
route.post("/CreateHistoryTrain", CreateHistoryTrain);
route.delete("/DeleteLichSuDatTau", DeleteLichSuDatTau);

module.exports = route;
