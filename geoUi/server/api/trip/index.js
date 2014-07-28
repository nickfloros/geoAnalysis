'use strict';

var express = require('express');
var controller = require('./trip.controller');

var router = express.Router();

router.get('/distance/:origins/:destination',controller.distance);
router.get('/',controller.get);

module.exports = router;