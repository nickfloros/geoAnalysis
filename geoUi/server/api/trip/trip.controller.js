'use strict';
var _ = require('lodash');
var https = require('https');
var http=require('http');

var collection;

exports.index=function(req,res) {
	var data = {
		success:true,
		addresses : [
			{postCode : 'RG214EA', distance:0},
			{postCode:'BH234AJ',distance:0}]
	};
	res.json(data);
};


exports.get = function(req,res) {
	var data = {
		success:true,
		addresses : [
			{postCode : 'RG214EA', distance:0},
			{postCode:'BH234AJ',distance:0}]
	};

	res.json(data);
};

exports.distance=function(req,resp) {
	console.log('distance');
	var origins = req.params.origins;
	var dest = req.params.destination;
	console.log(origins);
	console.log(dest);
	var foo = origins.replace(/,/g, '|');
  var url = "/maps/api/distancematrix/json?origins=";
           url+=foo;
           url+='&destinations='+dest;
           url+='&key=AIzaSyDXADXhSoCqOQnMnp5TiTp-zC16-gQS7qs';
   console.log(url);

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

	    resp.json(JSON.parse(body));
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	}); 
	
};