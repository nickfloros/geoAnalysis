'use strict';

angular.module('geoUiMapApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.categoryCounter = 0;
    $scope.tripsCounter = 0;
    $scope.currentTrip={};

    $http.get('/api/things').success(function(awesomeThings) {
      console.log(awesomeThings.length);
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('/api/categories').success(function(categories){
      console.log(categories.length);
    	$scope.categoryCounter=categories.length;
    })

    $http.get('/api/trips').success(function(trips){
      console.log(trips.length);
      $scope.tripsCounter=trips.length;
    })

    $http.get('/api/trips/1').success(function(trip){
      console.log(trip.length);
      $scope.currentTrip=trip[0];
      $scope.$broadcast('SHOW_TRIP',trip[0]);
    })
  });