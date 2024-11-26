'use strict'

const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
} = require("../../../controllers/bookingCar_controller");

route.get("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.get("/FindBookingCarID", FindBookingCarID);
route.get("/FindBookingCarMaDX", FindBookingCarMaDX);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/CancelBooking/:MaDX", CancelBooking);

//===== CREATE ORDER


module.exports = route;
