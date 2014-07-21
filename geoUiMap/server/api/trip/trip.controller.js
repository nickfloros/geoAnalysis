'use strict';

var _ = require('lodash');
var trip = require('../../repository/tripsRepository');

var collection;

exports.getAll=function(req,res) {
	trip.getAll(function(err,data){
		var payload = {
			success: true,
			data : data
		};
//		resp.setHeader('Content-Type', 'application/json');
//		resp.end(JSON.stringify(payload));
		res.json(payload)
	});
};

exports.getTrip=function(req,res) {
	console.log(req.params.id);
	trip.getTrip(Math.round(req.params.id),function(err,data){
		var payload = {
			status:true,
			data : data
		};
//		resp.end(JSON.stringify(payload));
		res.json(payload);
	});	
};

exports.getWeeklyTrips=function(req,res) {
	trip.getWeeklyTrips(req.params.weekday,function(err,data) {
		var payload = {
			success : true,
			data : data
		};
		res.json(payload);
	});	
};

exports.visits=function(req,res) {
	tripsRepository.getWeeklyTrips(req.params.weekday,function(err,data) {
		var visitsCodes=[];
		for (var i=0; i<data.length; i++) {
			
			visitsCodes[data.start.reverseGeocode.postCode]
		}
	});
};

