'use strict';

angular.module('geoUiMapApp')
  .controller('MapCtrl',['$scope','tripService', function ($scope, tripService) {
  	$scope.tripMarkers = [];
    $scope.routes = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.markerCluster=[];
    $scope.$on('new.trip',function() {
      var trips = tripService.getTrip().data;
      var markers=[];
      var startLatLng = 
        
      $scope.myMap.setCenter(new google.maps.LatLng(trips[0].start.loc.coordinates[0],
                trips[0].start.loc.coordinates[1]));

      var startLatLng = 
        new google.maps.LatLng(trips[0].start.loc.coordinates[0],
                trips[0].start.loc.coordinates[1]);


    for (var i=0; i<trips.length; i++) {
      var wp = trips[i].waypoints;
      var gPoints = [];
      for (var k=0; k<wp.length; k++) {
        var coords = wp[k].loc.coordinates;
        gPoints.push(new google.maps.LatLng(coords[0],coords[1]));
      }

      var routePath = new google.maps.Polyline({
        path: gPoints,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      routePath.setMap($scope.myMap);
      $scope.routes.push(routePath);
    } // end of trips over
  }); // end of $scope.on
}]);


      /*
      for (var i=0; i<trips.length; i++) 
        if (trips[i].waypoints.length>2) {    
      var trip = trips[i];  

      var startLatLng = 
        new google.maps.LatLng(trip.start.loc.coordinates[0],
                trip.start.loc.coordinates[1]);
      markers.push(new google.maps.Marker({
        map: $scope.myMap,
      position: startLatLng,
      title:trip.trip_id.toString()+'start'
      }));

      var endLatLng = 
        new google.maps.LatLng(trip.end.loc.coordinates[0],
                trip.end.loc.coordinates[1]);
      markers.push(new google.maps.Marker({
        map: $scope.myMap,
      position: endLatLng,
      title:trip.trip_id.toString()+'end'
      }));
      */
