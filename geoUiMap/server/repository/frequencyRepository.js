/* 
 * get frequency
 */

(function(frequencyRepository){
	
	var client = require('./dbClient');
	frequencyRepository.pageSize=200;
	frequencyRepository.get=function(set,day,page,next) {
		client.get().collection(set+'_'+day).find()
				.sort({_id:1})
				.skip(page*frequencyRepository.pageSize)
				.limit(frequencyRepository.pageSize)
				.toArray(next);
	};

	frequencyRepository.getExclude=function(set,day,catIds,next) {
		console.log(catIds);
		client.get().collection(set+'_'+day).find({'value.cat_id':{$nin:catIds}},{'value.weekday':0})
				.sort({_id:1})
				.toArray(next);
	};

	frequencyRepository.getRange=function(set, day, from, to, page, next) {
		client.get().collection(set+'_'+day).find({'value.count':{$gte:from,$lte:to}})
				.sort({_id:1})
				.skip(page*frequencyRepository.pageSize)
				.limit(frequencyRepository.pageSize)
				.toArray(next);
	};
})(module.exports);