/*
 * poi repository
 */

(function(poiRepository) {

 	var client = require('./dbClient');

 	poiRepository.getCategoryPoi=function(categoryId, next) {
 		client.pois().find({aa_category_id:categoryId}, {_id:0}).toArray(next);
 	};

 	poiRepository.getId = function(id, next) {
 		client.pois().find({aa_id:id}, {_id:0}).toArray(next);
 	};

 	poiRepository.getList = function(list,next) {
 		client.pois().find({aa_id:{$in:list}}, {_id:0}).toArray(next);
 	}

})(module.exports);
