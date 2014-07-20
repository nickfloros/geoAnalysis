'use strict';

var express = require('express');
var controller = require('./trip.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id',controller.getTrip);
module.exports = router;