'use strict';

angular.module('geoUiMapApp')
  .controller('MainCtrl', ['$scope','$rootScope','$http','tripService',function ($scope, $rootScope, $http, tripSerivce) {
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

//    for (var i=0; i<200; i++) {
    $http.get('/api/trips/weekday/Sunday').success(function(trip){
      console.log(trip.data.length);
      $scope.currentTrip=trip;
    });

    $rootScope.$on('map.ctrl',function(event, cmd){
      alert(cmd);
    })

    $rootScope.$on('get.weekdata',function(event,day){
      $http.get('/api/trips/weekday/'+day).success(function(trips) {
        console.log('received :'+trips.data.length);
        tripSerivce.setTrip(trips);
      });
    });
//}
/*    $http.get('/api/trips/2').success(function(trip){
      console.log(trip.data.length);
      $scope.currentTrip=trip;
      setTimeout(function() {
      $scope.$broadcast('SHOW_TRIP',trip.data);        
        },2000);
    });
*/

  }]);