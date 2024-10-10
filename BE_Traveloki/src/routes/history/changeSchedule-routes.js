'use strict';
console.log('routes');
const express = require('express');
const router = express.Router();

const changeSchedule = require('../../controllers/changeSchedule_controller');

router.patch('/ChangeSchedule/:id', changeSchedule);

module.exports = router;
