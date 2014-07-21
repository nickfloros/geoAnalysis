'use strict';

var express = require('express');
var controller = require('./poi.controller');

var router = express.Router();

router.get('/:id',controller.getId);
router.get('/category/:id',controller.getCategoryPoi)
router.get('/list/:poiList',controller.getList);

module.exports = router;