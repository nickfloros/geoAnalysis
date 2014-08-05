'use strict';

var express = require('express');
var controller = require('./frequency.controller');

var router = express.Router();

router.get('/exclude/:set/:day/:exludeList',controller.exclude);
router.get('/range/:set/:day/:from/:to/:page', controller.getRange);
router.get('/:set/:day/:page',controller.get);

module.exports = router;