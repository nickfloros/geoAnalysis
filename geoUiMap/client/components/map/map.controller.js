'use strict';

angular.module('geoUiMapApp')
  .controller('MapCtrl',['$scope','$http','tripService', 
    function ($scope, $http, tripService) {
  	$scope.tripMarkers = [];
    $scope.routes = [];
    $scope.poiList=[];
    $scope.tripsToProcess=0;
    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.markerCluster={};

    $scope.$on('plot.pois',function(event, data) {
      for (var i=0; i<$scope.routes.length; i++) 
        $scope.routes[i].setMap(null);
      $scope.tripsToProcess=tripService.getTrip().data.length;
      $scope.$broadcast('process.trip',tripService.getTrip().data.length-1);
    });


    $scope.$on('process.trip',function() {
      $scope.tripsToProcess--;
      var url='/api/trips/pois/'+tripService.getTrip().data[$scope.tripsToProcess].trip_id;
      console.log(url);
      $http.get(url).success(function(data){

        for (var i=0; i<data.data.length; i++) {
          var latLng = new google.maps.LatLng(data.data[i].loc.coordinates[0],
                  data.data[i].loc.coordinates[1]);
          var marker = new google.maps.Marker({'position': latLng});
          $scope.poiList.push(marker);
        }
        $scope.$broadcast('process.trip.end');
      });
    });

    $scope.$on('process.trip.end',function() {
      if ($scope.tripsToProcess>0)
        $scope.$broadcast('process.trip');
      else {
        //var mcOptions = {gridSize: 50, maxZoom: 10};
        $scope.markerCluster = new MarkerClusterer($scope.myMap, $scope.poiList);
      }
    });

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
