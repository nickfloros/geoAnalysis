/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var config = require('./config/environment');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
  var dbClient;
  console.log(config.mongo.uri);
  // Insert routes below

  app.use('/api/categories', require('./api/categories'));
  app.use('/api/trips',require('./api/trip'));
  app.use('/api/things', require('./api/thing'));

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
