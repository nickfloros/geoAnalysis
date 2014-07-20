/*
 * trips
 */ 

 (function(tripRepository) {

 	var client = require('./dbClient');

 	tripRepository.getAll=function(next) {
 		client.trips().find({},
 				{trip_id:1,weekday:1,_id:0},
 				function(err, cursor) {
 					cursor.sort({trip_id:1},function(err, dC) {
 						var records = [];
 						dC.each(function(err, data){
 							
 							if (data!==null)
 								records.push(data);
 							else
 								next(err,records);
 						})
 					});
 				}
 			);
 	};

 	tripRepository.getTrip=function(tripId, next) {
 		client.trips().find({trip_id:tripId},{_id:0}).
 		toArray(next);
 	};
 })(module.exports);
