'use strict';
console.log('routes');
const express = require('express');
const router = express.Router();

const changeSchedule = require('../../controllers/changeSchedule_controller');

router.put('/ChangeSchedule', changeSchedule);

module.exports = router;
