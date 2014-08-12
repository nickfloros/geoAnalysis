'use strict';

var _ = require('lodash');
var trip = require('../../repository/tripsRepository');
var poi = require('../../repository/poiRepository');
var async = require('async');

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

exports.getStartEnds=function(req,res) {
	var weekday=req.params['weekday']===undefined?null:req.params['weekday'];
	trip.getTripStartEnds(weekday,function(err,data) {
		var visitsCodes=[];
		for (var i=0; i<data.length; i++) {
						
			visitsCodes[data.start.reverseGeocode.postCode]
		}
	});
};

exports.getTripPois=function(req,res) {
	var tripId=req.params['id'];
	console.log('getTripPois -> searching : '+tripId);
	trip.getStartEndPois(Math.round(tripId),function(err, dataSet) {
		var payload = {
			success : true,
			data : []
		};
		// need to get unique entries ...
		async.eachSeries([dataSet[0].start.pois,dataSet[0].end.pois],
			function(data, cb) {
				var list=[];
				_.forEach(data,function(item) {list.push(Math.round(item.aa_id));});
				poi.getLocsList(list,function(err, dataSet) {
					_.forEach(dataSet,function(item) {payload.data.push(item);});
					cb();
				});
			},
			function(err) {
				res.json(payload);
//				payload.data.push(dataRes);
			}
		);
	});	
};

