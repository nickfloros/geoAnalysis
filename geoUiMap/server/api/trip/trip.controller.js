'use strict';

var _ = require('lodash');
var trip = require('../../repository/tripsRepository');

var collection;

exports.index=function(req,res) {
	trip.get(function(err,data){
		res.json(data);
	});
};



