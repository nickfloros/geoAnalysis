'use strict';

angular.module('geoUiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    google.maps.visualRefresh = true;
		$scope.map = {
      showTraffic: true,
      showBicycling: false,
      showWeather: false,
      showHeat: false,
      center: {
        latitude: 45,
        longitude: -73
      },
      options: {
        streetViewControl: false,
        panControl: false,
        maxZoom: 20,
        minZoom: 3
      },
      zoom: 15,
      draggable: true
 		};
    $scope.trips = [];
       $scope.myData = [{name: "Moroni", age_id: 50},
                      {name: "Tiancum", age_id: 43},
                      {name: "Jacob", age_id: 27},
                      {name: "Nephi", age_id: 29},
                      {name: "Enos", age_id: 34}];

    $scope.gridOptions = { data: 'myData' };

    $http.get('/api/things').success(function(resp) {
      console.log(resp);
      $scope.awesomeThings = resp;
    });
    $http.get('/api/trips').success(function(resp) {

    });
  });