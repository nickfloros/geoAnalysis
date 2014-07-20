/* 
 * category repository
 */


 (function(categoryRepository) {

 	var client = require('./dbClient');

 	categoryRepository.get=function(next) {
 		client.categories().find({}).toArray(function(err,dataSet) {
 			console.log(dataSet.length);
 			next(err,dataSet);
 		});
 	};

 })(module.exports);
