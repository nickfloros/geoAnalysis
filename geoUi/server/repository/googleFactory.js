/* 
 * google factory
 */

(function(googleFactocy){

	var http=require('http');
	var https=require('https');
	googleFactocy.geocode = function(address, callback) {
		var options = {
		 	host: 'maps.googleapis.com',
		 	port: 80,
		 	path: '/maps/api/geocode/json?address='+address.postcode.replace(' ','')
		};
		console.log(options.host + options.path);
		http.get(options, function(res) {
		  
		 	var body = '';
		  res.on('data', function(chunk) {
		    body += chunk;
		  });
		  res.on('end', function() {
		  	var res = JSON.parse(body);
		  	if (res.status=='OK') {
		  		address.pos = res.results[0].geometry.location;
	/*
		  		{lat : res.results[0].nResp.Result[0].Location.DisplayPosition.Latitude,
								  			lng : res.results[0].nResp.Result[0].Location.DisplayPosition.Longitude};*/
				  callback();
		  	}
				else
					callback('failed pasing result');
		  });
		  }).on('error', function(e) {
		  	callback(err);
		});
	};


 googleFactocy.computeDistance=function(dataSet, callback) {

	var origins=dataSet.origins[0].postcode.replace(' ','');
	for (var i=1; i<dataSet.origins.length; i++) {
		origins+='|'+dataSet.origins[i].postcode.replace(' ','');
	}
	
  var url = "/maps/api/distancematrix/json?origins=";
           url+=origins;
           url+='&destinations='+dataSet.destination;
           url+='&key=AIzaSyDXADXhSoCqOQnMnp5TiTp-zC16-gQS7qs';

	var options = {
		  host: 'maps.googleapis.com',
		  path: url
	};
	https.get(options, function(res) {
	  var body = '';
	  res.on('data', function(chunk) {
	    body += chunk;
	  });
	  res.on('end', function() {
	  	var response = JSON.parse(body);
	  	var distances = [];
	  	console.log(response.destination_addresses[0]);
	  	dataSet.destination_address = response.destination_addresses[0];
	  	for (var i=0; i<response.rows.length; i++)
	  		dataSet.distances.push(response.rows[i].elements[0].distance.value/1000);
	    callback(null);
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	  callback(e);
	}); 

 };
})(module.exports);

 
