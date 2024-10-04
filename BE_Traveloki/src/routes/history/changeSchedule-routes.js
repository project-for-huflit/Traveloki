'use strict';

const express = require('express');
const router = express.Router();

const changeSchedule = require('../../controllers/changeSchedule_controller');

router.put('ChangSchedule', changeSchedule);

module.exports = router;
