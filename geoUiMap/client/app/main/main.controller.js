'use strict';

angular.module('geoUiMapApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.categoryCounter = 0;
    $scope.tripsCounter = 0;
    $scope.currentTrip={};

    $http.get('/api/categories/all').success(function(categories){
      console.log(categories.success)
      console.log(categories.data.length);
    	$scope.categoryCounter=categories.data.length;
    })

    $http.get('/api/trips/all').success(function(trips){
      console.log(trips.success);
      console.log(trips.data.length);
      $scope.tripsCounter=trips.data.length;
    })

    $http.get('/api/trips/1').success(function(trip){
      console.log(trip.data.length);
      $scope.currentTrip=trip;
      setTimeout(function() {
      $scope.$broadcast('SHOW_TRIP',trip.data);        
        },2000);
    });

    $http.get('/api/trips/2').success(function(trip){
      console.log(trip.data.length);
      $scope.currentTrip=trip;
      setTimeout(function() {
      $scope.$broadcast('SHOW_TRIP',trip.data);        
        },2000);
    });


  });