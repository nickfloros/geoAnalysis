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
	console.log(area);
	repository.getArea(req.params.area,function(err, dataSet) {
		if (dataSet[0].pos===undefined) {
			async.eachSeries( 
				dataSet,
				nokiaFactory.geocode,
				function(err) {
					var payload = {
						success:true,
						data : dataSet
					};
					repository.setLocation(dataSet);
					res.json(payload);
				}
			);
		}
		else{
			var payload = {
				success:true,
				data : dataSet
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
				{text:'north',id:'liverpool_manchester'}]
	};

	res.json(payload);
};