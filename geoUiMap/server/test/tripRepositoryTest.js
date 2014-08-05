/* 
 * test tip search 
 */

var tripRepository=require('../repository/tripRepository.js');


var options = {
		lat:54.01933014,
	  lng:-1.068345308,
	  maxDistance:2600.0,
	  searchType:0
	};

tripRepository.findCommonPoints(options,function(err, dataSet) {

});