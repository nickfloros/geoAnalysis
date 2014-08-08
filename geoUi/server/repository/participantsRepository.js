/*
 * participants 
 */

(function(participantsRepository) {

	var client = require('./dbClient');

	participantsRepository.PageSize=100;

	participantsRepository.getAreaLike=function(area,page,next) {
		client.participants().find({county:{$regex:area,$options:'i'}},
			{postcode:1,_id:0,pos:1},
			function(err,cursor){
				cursor.sort({postcode:1}).skip(page*participantsRepository.PageSize).limit(participantsRepository.PageSize).toArray(next);
			}
		);
	};

	participantsRepository.getArea = function(area,page,next) {
		var query;
		if (area==='birm')
			query={county:{$regex:area,$options:'i'},pos:{$ne:null}};
		else
			query={tag:area,pos:{$ne:null}};
		client.participants().find(query,
			{postcode:1,_id:0,pos:1},
			function(err,cursor) {
				cursor.sort({postcode:1}).skip(page*participantsRepository.PageSize).limit(participantsRepository.PageSize).toArray(next);
			}
		);
	};

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