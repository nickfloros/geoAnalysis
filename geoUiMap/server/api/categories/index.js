'use strict';

var express = require('express');
var controller = require('./categories.controller');

var router = express.Router();

router.get('/all', controller.getAll);
router.get('/:id',controller.getId);

module.exports = router;