const express = require("express");
const route = express.Router();
const {
  GetPhuongTien,
  CreatePhuongTien,
  SearchFindPhuongTien,
  DeletePhuongTien,
  GetPhuongTienID,
} = require("../../controllers/phuongTien_controller");

route.get("/GetPhuongTien", GetPhuongTien);
route.get("/SearchFindPhuongTien/:type", SearchFindPhuongTien);
route.post("/CreatePhuongTien", CreatePhuongTien);
route.delete("/DeletePhuongTien/:id", DeletePhuongTien);
route.get("/GetPhuongTienID/:id", GetPhuongTienID);
module.exports = route;
