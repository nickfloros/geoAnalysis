/* 
 * category repository
 */


 (function(categoryRepository) {

 	var client = require('./dbClient');

 	categoryRepository.get=function(next) {
 		client.categories().find({},{_id:0},function(err, cursor){
			var records = [];
			cursor.each(function(err, item){
				if (item===null) {
					console.log('categoryRepository ' + records.length);
					next(err,records);
				}
				else  
					records.push(item);
				
			});
 		});
 	};

 })(module.exports);
