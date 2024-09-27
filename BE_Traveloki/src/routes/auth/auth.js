'use strict';

const express = require('express');
const route = express.Router();

const { login, register } = require('../../controllers/auth_controller');

router.post('/login', login).post('/register', register);
