const express = require('express');
const route = express.Router();

const authController = require('../../../controllers/auth_controller')
const asyncHandler = require('../../../middlewares/asyncHandler.middeware')
const { authenticationUser } = require('../../../services/auth/utils')

// region JWT SERVICE
route.post('/auth/register', asyncHandler(authController.register))
route.post('/auth/login', asyncHandler(authController.login))
// AuthenticationUser
// route.use(authenticationUser)
// ==============
route.post('/auth/logout', asyncHandler(authController.logout))
route.post('/auth/handle-refresh-token-user', asyncHandler(authController.register))

module.exports = route;
