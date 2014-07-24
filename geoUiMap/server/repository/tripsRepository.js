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


 	tripRepository.getTripStartEnds=function(weekday,next) {
 		var query = weekday===null?{}:{weekday:weekday};
 		client.trips().find(query,{'trip_id':1,'start.loc':1,'start.revGeocode':1,'end.loc':1,'end.revGeocode':1},
 			function(err, cursor) {
 			cursor.sort({trip_id:1},function(err, rec) {
 				next(err,rec);
 			});
 		});
 	};

	tripRepository.getStartEndPois=function(id,next) {
		client.trips().find({trip_id:id},
					{'start.pois.aa_id':1,'end.pois.aa_id':1,_id:0}).toArray(next);
	};

 })(module.exports);
