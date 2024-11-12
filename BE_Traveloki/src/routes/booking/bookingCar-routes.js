const express = require("express");
const route = express.Router();

const asyncHandler = require('../../middlewares/asyncHandler.middeware')
const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
  PaymentPointerWallet,
  CancelPaymentPointerWallet
} = require("../../controllers/bookingCar_controller");

route.get("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);

route.post("/payment/pointer-wallet/car", asyncHandler(PaymentPointerWallet))
route.post("/payment/pointer-wallet/car/cancel", asyncHandler(CancelPaymentPointerWallet))

route.get("/FindBookingCarID/:id", FindBookingCarID);
route.get("/FindBookingCarMaDX", FindBookingCarMaDX);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/CancelBooking/:MaDX", CancelBooking);

module.exports = route;
