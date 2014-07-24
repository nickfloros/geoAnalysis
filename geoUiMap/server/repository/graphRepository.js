/*
 * graph repository 
 */

(function(graphRepository){
 	var client = require('./dbClient');

 	graphRepository.get = function(type, next) {
 		var query =type === null?{}:{type:type};
 		client.graph().find(query,{_id:0}, function(err, cursor) {
 			var dataSet = {};
 			cursor.each(function(err, rec) {
 				if (err!==null) throw err;
 				if (rec!==null)
 					dataSet=rec;
 				else
 					next(err,dataSet);
 			});
 		});
 	};

})(module.exports);