'use strict';

angular.module('geoUiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.destinationAddress='n/a';
    google.maps.visualRefresh = true;
		$scope.map = {
      showTraffic: true,
      showBicycling: false,
      showWeather: false,
      showHeat: false,
      center: {
        latitude: 52.3,
        longitude: -1.4
      },
      options: {
        streetViewControl: false,
        panControl: false,
        maxZoom: 20,
        minZoom: 3
      },
      zoom: 10,
      draggable: true,
      events: {
        click:function (mapModel, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
            var lat = e.latLng.lat(),
                lon = e.latLng.lng();
          $scope.map.destinationMarker=[]
          $scope.map.destinationMarker.push({ id: 0,
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
            showWindow: false});
           $scope.$apply();
           var url = "/api/trips/distance/";
           url+=$scope.myData[0].postCode +'|'+$scope.myData[1].postCode;
           url+='/'+lat+','+lon;
           console.log(url)
           $http.get(url).success(function(distances) {
            $scope.destinationAddress = distances.destination_addresses[0];
            $scope.myData[0].distance=distances.rows[0].elements[0].distance.value/1000;
            $scope.myData[1].distance=distances.rows[1].elements[0].distance.value/1000;
           });
        }
      }
 		};
  
    $scope.map.addressMarkers=[];
    $scope.map.destinationMarker=[];
    $scope.trips = [];
    $scope.myData = [];/*{name: "Moroni", age_id: 50},
                      {name: "Tiancum", age_id: 43},
                      {name: "Jacob", age_id: 27},
                      {name: "Nephi", age_id: 29},
                      {name: "Enos", age_id: 34}];
*/
    $scope.gridOptions = { data: 'myData' 
    };

    $http({url:'/api/trips',method:'GET'})
      .success(function(data) {
           
           $scope.myData = data.addresses;//data;
           for (var i=0; i<data.addresses.length; i++) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': data.addresses[i].postCode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var geo = results[0].geometry;

         $scope.map.center={latitude:geo.location.lat(),
          longitude:geo.location.lng()};
       $scope.map.addressMarkers.push({ id: i,
        latitude: geo.location.lat(),
        longitude: geo.location.lng(),
        showWindow: false});
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
           }
      });                           

  });