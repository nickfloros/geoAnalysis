/*
 * test google geocoder ...
 */
var http=require('http');
var async=require('async');

var ReverseGeocode =function() {

};

ReverseGeocode.prototype.process=function(pos,cb){
	var parent = this;
	parent.pos = pos;
	parent.cb = cb;

	var options = {
	  	host: 'maps.googleapis.com',
	  	port: 80,
	  	path: '/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng
		};
		console.log(options);
	http.get(options, function(res) {
	  console.log("Got response: " + res.statusCode);
	 	var body = '';
	  res.on('data', function(chunk) {
	    body += chunk;
	  });
	  res.on('end', function() {
	  	var res = JSON.parse(body);
	  	if (res.status=='OK') {
	  		parent.pos.revGeocode = res;
			  cb();
	  	}
			else
				cb('failed pasing result');
	  });
	  }).on('error', function(e) {
	  	cb(err);
	});
};

module.exports=ReverseGeocode;
