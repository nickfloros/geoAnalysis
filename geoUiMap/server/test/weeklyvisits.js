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
var contains=function(list, test) {
	for (var i=0; i<list.length; i++)
		if (list[i]===test)
			return i;
	return -1;
};

MongoClient.connect(config.mongo.uri, function(err, db){
	db.collection('trips').find({}).toArray(function(err, dataSet) {
		console.log(dataSet.length);
		var places=[];
		var placesArray=[];
		var key=[];
		var locs=[];
		for (var i=0; i<dataSet.length; i++) {
			var pcStart = dataSet[i].start.revGeocode.address.text;
			var pcEnd = dataSet[i].end.revGeocode.address.text;
//			console.log('processing '+i+' out of '+dataSet.length);
			if (!_.contains(placesArray,pcStart)){
				placesArray.push(pcStart);
				key[pcStart]=placesArray.length-1;
				locs.push({
					loc:dataSet[i].start.loc,
					revGeocode : dataSet[i].start.revGeocode
				});
			}
			if (!_.contains(placesArray,pcEnd)) {
				placesArray.push(pcEnd);
				key[placesArray.length-1]=pcEnd;
				locs.push({
					loc:dataSet[i].end.loc,
					revGeocode : dataSet[i].end.revGeocode
				});
			}
		}


		var matrix=new Array(placesArray.length);
		var frequency=new Array(placesArray.length);
		var hitCountStart=new Array(placesArray.length);
		var hitCountEnd=new Array(placesArray.length);

		for (var i=0; i<placesArray.length; i++) {
			matrix[i]=new Array(placesArray.length);
			frequency[i] = new Array(placesArray.length);
			hitCountEnd[i]=0;
			hitCountStart[i]=0;
			for (var j=0;j<placesArray.length; j++) {
				matrix[i][j]=0;
				frequency[i][j]=0;
			}
		}

		for (var i=0; i<dataSet.length; i++) {
//			console.log('processing '+i);
			var pcStart = dataSet[i].start.revGeocode.address.text;
			var pcEnd = dataSet[i].end.revGeocode.address.text;
			var iStart = contains(placesArray,pcStart);
			var iEnd = contains(placesArray,pcEnd);									
			matrix[iStart][iEnd]=1;
			frequency[iStart][iEnd]++;
			hitCountStart[iStart]++;
			hitCountEnd[iEnd]++;
		}
//		for (var i=0; i<placesArray.length; i++) 
//			console.log(placesArray[i]+' - ' +hitCountStart[i]+' - '+hitCountEnd[i]);

		for (var i=0; i<placesArray.length; i++) {
			var line = '';
			for (var j=0; j<placesArray.length; j++) 
				line += matrix[i][j];
		}



		var dataSet = {
			type : 'dependancyWheele',
			matrix : matrix,
			locs : locs,
			frequency:frequency,
			hitCountStart:hitCountStart,
			hitCountEnd:hitCountEnd
		};
		db.collection('graph').insert(dataSet,function(err,resp){process.exit();});
		
	});
});



