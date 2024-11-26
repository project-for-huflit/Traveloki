const express = require('express');
const route = express.Router();
const {
  GetLichChayPartern,
  getAllLichChay,
  createLichChay,
  deleteLichChay,
  updateLichChay,
} = require('../../controllers/lichChay_controller');

route.get('/GetLichChayPartern/:id', GetLichChayPartern);
route.get('/lichChay', getAllLichChay);
route.post('/lichChay', createLichChay);
route.delete('/lichChay/:id', deleteLichChay);
route.put('/lichChay', updateLichChay);

module.exports = route;
