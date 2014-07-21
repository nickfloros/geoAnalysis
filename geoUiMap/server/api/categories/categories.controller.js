'use strict';

var _ = require('lodash');
var categories = require('../../repository/categoryRepository');

// Get list of categories
exports.getAll = function(req, res) {
  	categories.getAll(function(err,data){
			var payload = {
				success : true,
				data : data
			};
			res.json(payload);
			//res.end(JSON.stringify(data));
		});
};

exports.getId=function(req,res) {
	categories.getId(Math.round(req.params.id),function(err, data) {
		var payload = {
			success:true,
			data : data
		};
		res.json(payload);
	});
}