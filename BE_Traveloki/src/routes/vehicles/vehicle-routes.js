'use strict';
import Post from './../../../../ADMIN_Traveloki/src/components/PhuongTien/post';

const express = require('express');
const route = express.Router();

const {createVehicle} = require('../../controllers/vehicle_controller');

route.post('/createVehicle', createVehicle);