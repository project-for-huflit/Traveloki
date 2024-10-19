

const express = require("express");
const route = express.Router();
const {getAllLichChay, createLichChay, deleteLichChay, updateLichChay} = require("../../controllers/lichChay_controller");

route.get("/lichChay", getAllLichChay);
route.post("/lichChay", createLichChay);
route.delete("/lichChay/:id", deleteLichChay);
route.put("/lichChay", updateLichChay);

module.exports = route;
