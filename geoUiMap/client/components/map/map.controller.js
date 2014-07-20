'use strict';

angular.module('geoUiMapApp')
  .controller('MapCtrl', function ($scope) {
  	$scope.tripMarkers = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.$on('SHOW_TRIP',function(event,trip){

    	
    	var startLatLng = 
    		new google.maps.LatLng(trip.start.loc.coordinates[0],
    						trip.start.loc.coordinates[1]);
    $scope.tripMarkers.push(new google.maps.Marker({
    		map: $scope.myMap,
    	position: startLatLng,
    	title:'start'
  		}));
    	var endLatLng = 
    		new google.maps.LatLng(trip.end.loc.coordinates[0],
    						trip.end.loc.coordinates[1]);
    $scope.tripMarkers.push(new google.maps.Marker({
    		map: $scope.myMap,
    	position: endLatLng,
    	title:'end'
  		}));
      $scope.mapOptions.center=startLatLng;
      for (var i=1; i<trip.waypoints.length-1; i++) {
      var point = 
        new google.maps.LatLng(trip.waypoints[i].loc.coordinates[0],
                trip.waypoints[i].loc.coordinates[1]);
    $scope.tripMarkers.push(new google.maps.Marker({
        map: $scope.myMap,
      position: point,
      title:i.toString()
      }));

      }
    })
  });
