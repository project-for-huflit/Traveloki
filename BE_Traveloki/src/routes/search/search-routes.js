'use strict'

const express = require("express");
const route = express.Router();

const {
  SuggestsAirpost,
  SuggestsTramDung, checkTuyenTramDung,
} = require("../../controllers/search_controller");

route.get("/SuggestsAirpost", SuggestsAirpost);
route.get("/SuggestsTramDung", SuggestsTramDung);
route.post("/CheckRoute", checkTuyenTramDung);

module.exports = route;
