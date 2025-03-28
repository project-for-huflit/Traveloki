const express = require("express");
const route = express.Router();

const {addDriver,getDrivers} = require("../../controllers/driver_controller");


route.post("/addDriver", addDriver);
route.get("/getDrivers", getDrivers);

module.exports = route;