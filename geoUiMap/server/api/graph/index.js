/*
 * graph api index
 */

 'use strict';

var express = require('express');
var controller = require('./graph.controller');

var router = express.Router();

router.get('/', controller.getGraph);

router.get('/matrix', controller.getMatrix);
router.get('/names', controller.getNames);
//router.get('/:type', controller.get);

module.exports = router;