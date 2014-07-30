/*
 * participants 
 */

(function(participantsRepository) {

	var client = require('./dbClient');

	participantsRepository.PageSize=100;

	participantsRepository.getArea = function(area,page,next) {
		client.participants().find({tag:area},{postcode:1,_id:0,pos:1},function(err,cursor) {
			cursor.sort({postcode:1}).skip(page*100).batchSize(100).toArray(next);
		});
	}

	participantsRepository.setLocation = function(dataSet,tag) {
		for (var i=0; i<dataSet.length; i++) {
			client.participants().update({postcode:dataSet[i].postcode,tag:tag},
				{$set:{pos:dataSet[i].pos}},
				{w:1},
				function(err,result) {
					if (err) throw err;
				}
				);
		}
	}
})(module.exports);