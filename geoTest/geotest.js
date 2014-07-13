/*
 * test google geocoder ...
 */
var http=require('http');
var async=require('async');
var monogdb=require('mongodb').MongoDbClient;

var ReverseGeocode =function() {

};

ReverseGeocode.prototype.process=function(pos,cb){
	var parent = this;
	parent.pos = pos;
	parent.cb = cb;

	var options = {
	  	host: 'maps.googleapis.com',
	  	port: 80,
	  	path: '/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng//53.9880985,-1.044328809'
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

/*revGeocode({lat:53.9880985,lng:-1.044328809},function(err,data) {
	// first entry contains the address ...
	var address = {components}
});
*/

var data=[];
for (var i=0; i<2; i++) {
	data.push({lat:53.9880985,lng:-1.044328809});
}

// bulk process data 
async.eachSeries(data,
	function( point, callback){
		var svc  = new ReverseGeocode();
		svc.process(point,callback);
	},
	function(err) {
		if (err) throw err;
		for (var i=0; i<data.length; i++) {
			console.log(data[i].revGeocode.results[0].formated_address);
		}
	}
);
