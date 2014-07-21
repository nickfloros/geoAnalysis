/*
 * trips
 */ 

 (function(tripRepository) {

 	var client = require('./dbClient');

 	tripRepository.getAll=function(next) {
 		client.trips().find({},
 				{trip_id:1,weekday:1,_id:0},function(err,cursor) {
 					cursor.sort({trip_id:1}).toArray(next);
 				});
 	}

 	tripRepository.getTrip=function(tripId, next) {
 		client.trips().find({trip_id:tripId},{_id:0}).toArray(next);
 	};

 	tripRepository.getWeeklyTrips = function(weekday,next) {
 		client.trips().find({weekday:weekday},{_id:0},function(err,cursor){
 			cursor.sort({trip_id:1}).toArray(next);
 		});
 	};

 })(module.exports);
