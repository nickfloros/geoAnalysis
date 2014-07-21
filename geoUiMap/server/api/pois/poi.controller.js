/*
 poi.controller
*/
'use strict';

var _ = require('lodash');
var poi = require('../../repository/poiRepository');

var collection;


exports.getCategoryPoi=function(req,res) {
	poi.getCategoryPoi(Math.round(req.params.id),function(err,data) {
		var payload = {
			success:true,
			data : data
		};
		res.json(payload);
	});
};

exports.getId=function(req,res) {
	var resp = res;
	console.log(req.params.id);
	poi.get(Math.round(req.params.id),function(err,data){
		resp.setHeader('Content-Type', 'application/json');
		resp.end(JSON.stringify(data));
	});	
};


exports.getList=function(req,res) {
	var poiList = [];
	var split=req.params.poiList.split(',');
	console.log(split);
	console.log(req.params.poiList);
	for (var i=0; i<split.length; i++) 
		poiList.push(parseInt(split[i]));
	poi.getList(poiList,function(err,data) {
		var payload = {
			success : true,
			data : data
		};
		res.json(payload);
	});	
};


