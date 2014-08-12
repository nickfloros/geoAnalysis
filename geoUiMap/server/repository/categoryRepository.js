/* 
 * category repository
 */

 (function(categoryRepository) {

 	var client = require('./dbClient');

 	categoryRepository.getAll=function(next) {
 		client.categories().find({},{_id:0}).toArray(next);
 	};

 	categoryRepository.getId = function(id, next) {
 		client.categories().find({aa_category_id:id}, {_id:0}).toArray(next);
 	};

 	categoryRepository.getList=function(list, next) {
 		client.categories().find({aa_category_id:{$in:list}},{_id:0,aa_category_id:1,layer_name:1}).toArray(next);
 	};

 })(module.exports);
