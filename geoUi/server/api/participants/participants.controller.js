/*
 * participants.controller.js
 */
 'use strict';
var _ = require('lodash');
var async = require('async');
var http = require('http');
var repository = require('../../repository/participantsRepository.js')
var nokiaFactory = require('../../repository/nokiaFactory.js');



exports.getArea = function(req, res) {
	var area = req.params.area;
	var page = req.params.page===undefined?0:Math.round(parseInt(req.params.page));

	console.log(area);
	repository.getArea(req.params.area,page,function(err, dataSet) {
		console.log(dataSet.length);
		if (dataSet.length>0) {
			if (dataSet[0].pos===undefined)
				async.eachSeries( 
					dataSet,
					nokiaFactory.geocode,
					function(err) {
						if (err) console.log(err);
						var payload = {
							success:true,
							page: dataSet.length==100?page+1:-1,
							data : dataSet
						};
						repository.setLocation(dataSet,area);
						res.json(payload);
					}
				);
			else {

				var payload = {
					success:true,
					page: dataSet.length==100?page+1:-1,
					data : dataSet
				};
				repository.setLocation(dataSet,area);
				res.json(payload);
			}
		}
		else // got to the end ...
		{
			var payload = {
					success:true,
					page: -1,
					data : []
				};
				res.json(payload);
		}
	});
};

exports.getAreas = function(req, res) {
	var payload = {
		success:true,
		data : [
				{text:'london',id:'london'},
				{text:'reading',id:'reading'},
				{text:'north',id:'liverpool_manchester'},
				{text:'birmingham',id:'birmingham'},
				{text:'all',id:'master'}]
	};

	res.json(payload);
};