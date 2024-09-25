const express = require("express");
const route = express.Router();

const {
  SuggestsAirpost,
  SuggestsTramDung,
} = require("../controllers/SearchController.js");

route.get("/SuggestsAirpost", SuggestsAirpost);
route.get("/SuggestsTramDung", SuggestsTramDung);

module.exports = route;
