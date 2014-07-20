'use strict';
var _ = require('lodash');
var trip = require('../../repository/tripsRepository');

var collection;

exports.index=function(req,res) {
	trip.get(function(err,data){
		sData = []
		res.json(data);
	});
};


exports.get = function(req,res) {
	trip.getTrip(Math.round(req.params.id),function(err,data){
		res.json(data);
	});
};