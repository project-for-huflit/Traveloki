'use strict'

const express = require("express");
const route = express.Router();

const {
  SuggestsAirpost,
  SuggestsTramDung,
} = require("../../controllers/search_controller");

route.get("/SuggestsAirpost", SuggestsAirpost);
route.get("/SuggestsTramDung", SuggestsTramDung);

module.exports = route;
