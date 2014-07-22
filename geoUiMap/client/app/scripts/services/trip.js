'use strict';

angular.module('geoUiMapApp')
  .service('tripService', ['$rootScope',function Trip($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var tripStore = [];

    var setTrip = function(newTrip) {
    	this.tripStore = newTrip;
    	$rootScope.$broadcast('new.trip'); // now tell anybody that we have a new tripSet
    };

    var googleLatLng = function(loc) {
    	return new google.maps.LatLng(loc.coordinates[0],
    						loc.coordinates[1]);
    };

    var googlePolyline = function(tripId) {

    };
    return {
    	setTrip: setTrip,
    	getTrip: function() {return this.tripStore;},
    	googleLatLng : googleLatLng
    };
  }]);
