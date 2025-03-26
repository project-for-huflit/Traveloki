const express = require('express');
const route = express.Router();

const { AuthController, AuthControllerStrategy } = require('../../../controllers/auth_controller')
const asyncHandler = require('../../../middlewares/asyncHandler.middeware')
const { authenticationUser } = require('../../../services/auth/utils')
const { checkRole } = require('../../../services/auth/check')
const authMiddleware = require("../../../middlewares/authStrategy.middleware");
// import ROLES from '../../../data/enum/'
// route.post('/auth/register',checkRole(ROLES.USER),asyncHandler(AuthController.register))


// region JWT SERVICE
route.post('/auth/register', asyncHandler(AuthController.register))
route.post('/auth/login', asyncHandler(AuthController.login))
// #region strategy - Quan
route.post('/auth/register/strategy', authMiddleware, asyncHandler(AuthControllerStrategy.register))
route.post('/auth/login/strategy', authMiddleware, asyncHandler(AuthControllerStrategy.login))
// AuthenticationUser
// route.use(authenticationUser)
// ==============
route.post('/auth/logout', asyncHandler(AuthController.logout))
route.post('/auth/handle-refresh-token-user', asyncHandler(AuthController.handlerRefreshTokenUser))

module.exports = route;
