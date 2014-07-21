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
 	}
 })(module.exports);
