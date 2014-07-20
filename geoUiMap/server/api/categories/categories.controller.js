'use strict';

var _ = require('lodash');
var categories = require('../../repository/categoryRepository');

// Get list of categories
exports.index = function(req, res) {
  	categories.get(function(err,data){
		res.json(data);
	});
};