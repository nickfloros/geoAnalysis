/*
 * poi repository
 */

(function(poiRepository) {

 	var client = require('./dbClient');
 	var geoFactory = require('../factory/geoFactory');

 	poiRepository.getCategoryPoi=function(categoryId, next) {
 		client.pois().find({aa_category_id:categoryId}, {_id:0}).toArray(next);
 	};

 	poiRepository.getId = function(id, next) {
 		client.pois().find({aa_id:id}, {_id:0}).toArray(next);
 	};

 	poiRepository.getList = function(list,next) {
 		client.pois().find({aa_id:{$in:list}}, {_id:0}).toArray(next);
 	}

 	poiRepository.getLocsList = function(list,next) {
 		client.pois().find({aa_id:{$in:list}}, {'loc':1,'_id':0}).toArray(next);
 	};

 	/* 
 	 * search for 
 	 * wayPoint : array [2] : lat, lng
 	 * searchField points to the object that we geo search agaisnt
 	 * collection we are querying
 	 * distance how far in meters we are looking
 	 * next call back when we finish takes two parameters err, data
 	 */
	poiRepository.findCommonTrips=function (wayPoint, searchField, collection, distance, next) {
	  var q= { searchField :
       { $near :
          {
            $geometry : {
               type : "Point" ,
               coordinates : [ wayPoint[0],
								                wayPoint[1] ] },
            $maxDistance : distance
          }
       }
    };
    
		collection.find(q,{_id:1}, function(err, cursor) {
			var dataSet = [];
			if (err) next(err);
			else {
				cursor.each(function(err,data) {

					if (err) next(err);

					if (data!== null) {
						wayPoint.pois.push(data);
					} 
					else {
						next(null, dataSet);
					}

				});
			}
		});
	};
})(module.exports);
