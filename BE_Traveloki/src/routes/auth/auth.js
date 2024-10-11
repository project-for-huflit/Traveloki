'use strict';

const express = require('express');
const route = express.Router();

const { login, register } = require('../../controllers/auth_controller');
// const { loginSSO, registerSSO } = require('../../controllers/auth_controller');

route.post('/register', register)
route.post('/login', login)
// route.post('/register-sso', register)
// route.post('/login-sso', login)

module.exports = route;
