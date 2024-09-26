'use strict'

const express = require("express");
const route = express.Router();
const GetKhachHang = require("../../controllers/khachHang_controller");

route.post("/GetKhachHang", GetKhachHang);

module.exports = route;
