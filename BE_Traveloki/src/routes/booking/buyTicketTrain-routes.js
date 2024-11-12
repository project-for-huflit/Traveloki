'use strict'

const express = require("express");
const route = express.Router();

const {
  GetPhieusdattau,
  BuyTicketTrain,
  SchedularChange,
  CancelTicketTrain,
  FindBuyTicketTrainMaDX,
} = require("../../controllers/buyTicketTrain_controller");

route.post("/GetPhieusdattau", GetPhieusdattau);
route.post("/BuyTicketTrain", BuyTicketTrain);
route.get("/FindBuyTicketTrainMaDX/:MaVeTau", FindBuyTicketTrainMaDX);
route.put("/BuyTicketTrain/SchedularChange/:id", SchedularChange);
route.post("/CancelTicketTrain/:MaVeTau", CancelTicketTrain);

module.exports = route;
