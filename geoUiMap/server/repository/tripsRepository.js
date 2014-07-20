/*
 * trips
 */ 

 (function(tripRepository) {

 	var client = require('./dbClient');

 	tripRepository.get=function(next) {
 		client.trips().find({},
 				{'trip_id':1,'weekday':1},{'sort':['timeStart','asc']}
 			).toArray(function(err,dataSet) {
 				if (err) throw err;
 			console.log(dataSet.length);
 			next(err,dataSet);
 		});
 	};

 })(module.exports);
