'use strict';

var _ = require('lodash');
var categories = require('../../repository/categoryRepository');

// Get list of categories
exports.all = function(req, res) {
		var resp = res;
  	categories.get(function(err,data){
			resp.setHeader('Content-Type', 'application/json');
			resp.end(JSON.stringify(data));
		});
};