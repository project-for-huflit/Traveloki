const express = require("express");
const route = express.Router();

const {addDriver,getDrivers,updateState} = require("../../controllers/driver_controller");


route.post("/addDriver", addDriver);
route.get("/getDrivers", getDrivers);
route.put("/updateState", updateState);

module.exports = route;