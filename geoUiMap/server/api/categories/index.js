'use strict';

var express = require('express');
var controller = require('./categories.controller');

var router = express.Router();

router.get('/', controller.all);

module.exports = router;