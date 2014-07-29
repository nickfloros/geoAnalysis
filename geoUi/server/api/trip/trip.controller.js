'use strict';
var _ = require('lodash');
var participants = require('../../repository/participantsRepository');
var async=require('async');

var https = require('https');
var http=require('http');
var nokiaFactory = require('../../repository/nokiaFactory');
var googleFactory = require('../../repository/googleFactory');
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

exports.computeDistance=function(req,resp) {
	console.log(req.params.area);
	console.log(req.params.destination);
	participants.getArea(req.params.area,function(err, dataSet) {
		var payload = {
			success:true,
			data:{
				destination_address:'',
				distances:[]
			}
		};
		var sets = [];
		var partialSet=[];
		var partialSetCounter=0;
		for (var i=0; i<dataSet.length; i++) {
			if (partialSetCounter<50) {
				partialSet.push(dataSet[i]);
				partialSetCounter++;
			}
			else {
				sets.push(
					{
						origins:partialSet,
						destination:req.params.destination,
						distances : [],
						destination_address:''
					}
				);
				partialSet=[]; // strart a new set;
			}
		}
		if (partialSet.length>0)
			sets.push(
					{
						origins:partialSet,
						destination:req.params.destination,
						distances : [],
						destination_address:''
					});

		async.eachSeries(sets, 
			googleFactory.computeDistance,
		function(err){
			console.log(sets.length);
			console.log(sets[0].destination_address);
			payload.data.destination_address = sets[0].destination_address;
			for (var k=0; k<sets.length; k++) {
				console.log(sets[k].distances.length);
				for (var j=0; j<sets[k].distances.length; j++) {
					payload.data.distances.push(sets[k].distances[j]);
				}
			}
			resp.json(payload);			
		})

	});
};