'use strict';

var express = require('express');
var controller = require('./participants.controller');

var router = express.Router();

router.get('/in/:area',controller.getArea);
router.get('/',controller.getAreas);

module.exports = router;