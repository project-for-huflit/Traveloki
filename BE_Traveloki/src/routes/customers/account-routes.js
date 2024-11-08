const express = require('express');
const route = express.Router();
const getAccount = require('../../controllers/account_controller');

route.get('/getAccount', getAccount);

module.exports = route;
