/* 
 * db client 
 */

(function(dbClient){

	var config = require('../config/environment');
	var MongoClient = require('mongodb').MongoClient;
	var async=require('async');
	var _db;
	var _trips;
	var _aaCategories;
	var _pois;

	async.series([
		function(cb) {
			MongoClient.connect(config.mongo.uri, function(err, db) {
			  _db = db;
			  _trips=db.collection('trips');
			  console.log('trips ' + _trips===null);
			  _aaCategories=db.collection('aa_categories')
			  _pois = db.collection("pois");
			  console.log('done');
			  cb();
			});
		}],
		function(err) {
			console.log('connected');
			if (err) throw err;
		}
	);

	dbClient.get = function() {
		return _db;
	};

	dbClient.trips = function() {
			  console.log('trips ' + _trips===null);
		return _trips;
	};

	dbClient.pois = function() {
		return _pois;
	};
	
	dbClient.categories=function() {
		return _aaCategories;
	};
})(module.exports);

