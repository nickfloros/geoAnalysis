/*
 * weekday maps visits test ..
 */ 

'use strict';
process.env.NODE_ENV =  'development';
var config = require('../config/environment');
var _=require('underscore')._;

var trip = require('../repository/tripsRepository');
var MongoClient = require('mongodb').MongoClient;
console.log(config.mongo.uri);

var valueNotPresent=function(list, item) {
	console.log('searching for : '+item);
	for (var i=0; i<list.length; i++){
		if (list[i]===item) {
			console.log('found @'+i);
			return true;
		}
	}
	return false;	
};

MongoClient.connect(config.mongo.uri, function(err, db){
	db.collection('trips').find({weekday:'Monday'}).toArray(function(err, dataSet) {
		console.log(dataSet.length);
		var places=[];
		var placesArray=[];
		for (var i=0; i<dataSet.length; i++) {
			var pcStart = dataSet[i].start.revGeocode.address.text;
			var pcEnd = dataSet[i].end.revGeocode.address.text;
			console.log('processing '+i+' out of '+dataSet.length);
			if (!_.contains(placesArray,pcStart))
				placesArray.push(pcStart);
			if (!_.contains(placesArray,pcEnd))
				placesArray.push(pcEnd);
		}

		for (var i=0; i<placesArray.length; i++) 
			console.log(placesArray[i]);
	});
});



