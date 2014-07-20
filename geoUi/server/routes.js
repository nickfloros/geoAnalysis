/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config/environment');
module.exports = function(app) {

  var dataBase ;

  MongoClient.connect(config.mongo.uri, function(err, db) {
    dataBase = db;
  });

  // Insert routes below
  app.use('/api/trips', require('./api/trip'));
  app.use('/api/things', require('./api/thing'));
  
  app.use('/api/categories',function(req,res) {
    dataBase.collection('aa_categories').find().toArray(function(err, dataSet){
      res.json(dataSet);
    });
  });
/*
  app.use('/api/trips', function(req,res) {
    dataBase.collection('trace_poi').
      find({},{trip_id:1,weekday:1,timeStart:1,odmDistace:1},function(err, cursor) {
        if (err) throw err;
        cursor.sort({trip_id:1}).toArray(function(err, dataSet) {
          res.json(dataSet);
        });
      });
  });


  app.use('/api/trip/:id', function(req,res) {
    console.log(req.params.id);
    dataBase.collection('trace_poi').find({trip_id:Math.round(req.params.id)}).toArray(function(err, dataSet){
      res.json(dataSet);
    });
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
