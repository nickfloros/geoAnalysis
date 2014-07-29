/*
 * participants 
 */

(function(participantsRepository) {

	var client = require('./dbClient');


	participantsRepository.getArea = function(area,next) {
		client.participants().find({tag:area},{postcode:1,_id:0},function(err,cursor) {
			cursor.sort({postcode:1}).toArray(next);
		});
	}
})(module.exports);