/*
 *  reduce poi
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/environment');
var MongoClient = require('mongodb').MongoClient;
var async = require('async');

console.log('a');

var map = function() {
	for (var widx=0; widx<this.waypoints.length; widx++) {
	  for (var idx = 0; idx < this.waypoints[widx].pois.length; idx++) {
      var key = this.waypoints[widx].pois[idx].aa_category_id;
      var value = {
        count: 1,
        weekday : this.weekday,
        catId:key
      };
      emit(key, value);
	  }        
	}
};
console.log('a');

var reduce=function(categoryIdKey,countObjKey) {
  var reduceVal = {count:0,
      weekday : ''};
  for (var idx=0; idx<countObjKey.length; idx++) {
      reduceVal.count=reduceVal.count+countObjKey[idx].count;
      reduceVal.weekday = countObjKey[idx].weekday;
  }
  return reduceVal;
};
console.log('a');

var days=['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
console.log(config.mongo.uri);
var line=0;
MongoClient.connect(config.mongo.uri, function(err, db) {
	var tripCollection = db.collection('trips');
	async.eachSeries(days,function(day,cb){
		tripCollection.mapReduce(map, reduce,{
			out:{inline:1},
			query:{weekday:day},
			verbose:true
		},
		function(err,results,stats){
			db.collection('catid_'+day).insert(results,function(err){
				console.log(results);
				console.log(line++);
				cb();
			});
			
		});
	},
	function(err) {
		process.exit();
	});

});