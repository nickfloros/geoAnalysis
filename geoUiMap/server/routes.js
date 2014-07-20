/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var config = require('./config/environment');
//var tripController = require('./api/trip/trip.controller');
var tripRepository = require('./repository/tripsRepository.js');

var MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
  var dbClient;
  console.log(config.mongo.uri);
  // Insert routes below

 app.use('/api/categories', require('./api/categories'));
  app.use('/api/trips',require('./api/trip'));
  app.use('/api/things', require('./api/thing'));
/*
  app.get('/api/trips',function(req, res) {
    var resp = res;
    tripRepository.getAll(function(err, dataSet){
      var foo=[];
      for (var i=0; i<dataSet.length-1; i++)
        foo.push(dataSet[i]);
      resp.send(JSON.stringify(foo));
    });
  }); 
  app.get('/api/trip:id',function(req, res) {
    var resp = res;
    tripRepository.get(Math.round(req.params.id),
        function(err, dataSet){
      resp.send(JSON.stringify(dataSet));
    });
  }); 
  app.get('/api/categories',function(req, res) {
    var resp = res;
    tripRepository.getAll(function(err, dataSet){
      var foo=[];
      for (var i=0; i<dataSet.length-1; i++)
        foo.push(dataSet[i]);
      resp.send(JSON.stringify(foo));
    });
  }); */
  /*require('/api/trip/trip.contro')

    function(req,res) {
    res.json([{foo:1}]);
  });
  */
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
