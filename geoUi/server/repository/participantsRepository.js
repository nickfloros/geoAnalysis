/*
 * participants 
 */

(function(participantsRepository) {

	var client = require('./dbClient');


	participantsRepository.getArea = function(area,next) {
		client.participants().find({tag:area},{postcode:1,_id:0,pos:1},function(err,cursor) {
			cursor.sort({postcode:1}).toArray(next);
		});
	}

	participantsRepository.setLocation = function(dataSet) {
		for (var i=0; i<dataSet.length; i++) {
			client.participants().update({postcode:dataSet[i].postcode},
				{$set:{pos:dataSet[i].pos}},
				{w:1},
				function(err,result) {
					if (err) throw err;
				}
				);
		}
	}
})(module.exports);