'use strict';

const express = require('express');
const route = express.Router();
const {
  GetPhuongTien,
  CreatePhuongTien,
  SearchFindPhuongTien,
  DeletePhuongTien,
  GetPhuongTienID,
  GetPhuongTienByLichChay,
  updatePhuongTien,
} = require('../../controllers/phuongTien_controller');

route.get('/GetPhuongTien/:id', GetPhuongTien);
route.get('/SearchFindPhuongTien/:type', SearchFindPhuongTien);
route.post('/CreatePhuongTien', CreatePhuongTien);
route.delete('/DeletePhuongTien/:id', DeletePhuongTien);
route.get('/GetPhuongTienID/:id', GetPhuongTienID);
route.post('/GetPhuongTienByLichChay', GetPhuongTienByLichChay);
route.put('/UpdatePhuongTien', updatePhuongTien);

module.exports = route;
