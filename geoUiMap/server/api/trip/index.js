'use strict';

var express = require('express');
var controller = require('./trip.controller');

var router = express.Router();

router.get('/all', controller.getAll);
router.get('/:id',controller.getTrip);
router.get('/weekday/:weekday',controller.getWeeklyTrips);
router.get('/weekday/visits/:weekday',controller.visits);
module.exports = router;