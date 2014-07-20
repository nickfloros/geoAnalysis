/*
 * trips
 */ 

 (function(tripRepository) {

 	var client = require('./dbClient');

 	tripRepository.get=function(next) {
 		client.trips().find({},
 				{'trip_id':1,'weekday':1},
 				function(err, cursor) {
 					cursor.sort({trip_id:1});
 					cursor.toArray(function(err, records) {
			 			console.log(records.length);
			 			next(err,records);
 					});
 				}
 			);
 	};

 })(module.exports);
