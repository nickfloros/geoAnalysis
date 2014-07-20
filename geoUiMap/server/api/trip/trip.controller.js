'use strict';

var _ = require('lodash');
var trip = require('../../repository/tripsRepository');

var collection;

exports.getAll=function(req,res) {
	var resp = res;
	trip.getAll(function(err,data){
		resp.setHeader('Content-Type', 'application/json');
		resp.end(JSON.stringify(data));
	});
};

exports.getTrip=function(req,res) {
	var resp = res;
	console.log(req.params.id);
	trip.getTrip(Math.round(req.params.id),function(err,data){
		resp.setHeader('Content-Type', 'application/json');
		resp.end(JSON.stringify(data));
	});	
};



