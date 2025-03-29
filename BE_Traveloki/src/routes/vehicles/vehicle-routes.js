'use strict';

const express = require('express');
const route = express.Router();

const {createVehicle} = require('../../controllers/vehicle_controller');

route.post('/createVehicle', createVehicle);

module.exports = route;