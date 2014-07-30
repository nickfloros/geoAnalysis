/*
 * http helper 
 */

var http=require('http');
var https=require('https');
var queryString = require('querystring');

/**
 */
var HttpFactory = function(host,port) {
	this.host : host;
	this.port : port;
};

HttpFactory.prototype.get = function(url,params,next) {
	var path = url + querystring.stringify(params);
	var options = {
		  host: this.host,
		  port: this.port,
		  path: url;
	};

	http.get(options, function(res) {
	 	var body = '';
	  res.on('data', function(chunk) {
	    body += chunk;
	  });
	  res.on('end', function() {
	  	next(null,body);
	  });
	}).on('error', function(e) {
		console.log(e);
  	callback(e);
	});
};

export.modules=HttpFactory;