const express = require('express');
const route = express.Router();

const authController = require('../../../controllers/auth_controller')
const asyncHandler = require('../../../middlewares/asyncHandler.middeware')
const { authenticationPartner } = require('../../../services/auth/utils')

// region POINTER SERVICE
// route.post('/auth/partner/register', asyncHandler(authController.registerPointer))
// route.post('/auth/partner/login', asyncHandler(authController.loginPartner))
// route.post('/auth/partner/continue-with-pointer', asyncHandler(authController.loginPointer))
// route.post('/auth/partner/logout', asyncHandler(authController.logoutPointer))
// route.post('/auth/handle-refresh-token-pointer', asyncHandler(authController.handlerRefreshTokenPointer))

module.exports = route;
