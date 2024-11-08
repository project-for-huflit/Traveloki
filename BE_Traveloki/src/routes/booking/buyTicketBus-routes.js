'use strict'

const express = require("express");
const route = express.Router();
const asyncHandler = require('../../middlewares/asyncHandler.middeware')
const {
  GetBuyTicketBus,
  FindBuyTicketBusMaDX,
  BuyTicketBus,
  SchedularChange,
  CancelBookingBus,
  PaymentPointerWallet,
  CancelPaymentPointerWallet,
} = require("../../controllers/buyTicketBus_controller");

route.post("/GetBuyTicketBus", GetBuyTicketBus);
route.post("/BuyTicketBus", BuyTicketBus);

route.post("/payment/pointer-wallet/bus", asyncHandler(PaymentPointerWallet))
route.post("/payment/pointer-wallet/bus/cancel/:id", asyncHandler(CancelPaymentPointerWallet))

route.get("/FindBuyTicketBusMaDX/:MaVeBus", FindBuyTicketBusMaDX);
route.put("/BuyTicketBus/SchedularChange/:id", SchedularChange);
route.post("/CancelTicketBus/:MaVeBus", CancelBookingBus);

module.exports = route;
