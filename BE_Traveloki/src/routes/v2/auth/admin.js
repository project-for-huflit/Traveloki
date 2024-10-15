const express = require('express');
const route = express.Router();

const authController = require('../../../controllers/auth_controller')
const asyncHandler = require('../../../middlewares/asyncHandler.middeware')
const { authenticationUser } = require('../../../services/auth/utils')


module.exports = route;
