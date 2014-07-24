/*
 * graph controller.js
 */

'use strict';

var _ = require('lodash');
var graph = require('../../repository/graphRepository');

// Get list of categories
exports.getGraph = function(req, res) {
	var type = req.params['type']===undefined?null:req.params['type'];
	var page = req.query.page!==undefined?req.query.page:0;
  graph.get(type,function(err,dataSet){
  	console.log('posting resp ' + dataSet.hitCountEnd.length);
		var payload = {
			success : true,
			totalSize : dataSet.locs.length,
			data : {
				matrix : dataSet.matrix[page],
				locs : dataSet.locs[page]
			}
		};

		res.json(payload);
	});
};

// Get list of categories
exports.getMatrix = function(req, res) {
	var type = req.params['type']===undefined?null:req.params['type'];
	var page = req.query.page!==undefined?require.query.page:0;
  graph.get(type,function(err,dataSet){
  	console.log('posting resp ' + dataSet.hitCountEnd.length);
		var payload = {
			success : true,
			totalSize : data.locs.length,
			data : {

			}
		};
		var offset = page*20;
		var end = offset+20<dataSet.locs.length?offset+20:dataSet.locs.length;
		for (var i=offset; i<end; i++)
			payload.success.data.push(dataSet.locs[i]);

		res.json(payload);
	});
};

exports.getNames = function(req, res) {
	var type = req.params['type']===undefined?null:req.params['type'];
	var page = req.query.page!==undefined?require.query.page:0;
  graph.get(type,function(err,dataSet){
  	console.log('posting resp ' + dataSet.hitCountEnd.length);
		var payload = {
			success : true,
			data : dataSet.locs
		};
		var offset = page*20;
		var end = offset+20<dataSet.locs.length?offset+20:dataSet.locs.length;
		for (var i=offset; i<end; i++)
			payload.success.data.push(dataSet.locs[i]);

		res.json(payload);
	});
};
