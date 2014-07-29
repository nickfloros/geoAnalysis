'use strict';

angular.module('geoUiApp')
.controller('MainCtrl', function ($scope, $http) {
  $scope.awesomeThings = [];

  $scope.areas = [];

  $scope.destinationAddress='n/a';

  $http.get('/api/participants').success(function(dataSet) {
    $scope.areas = dataSet.data;
  })

  $scope.trips = [];
  $scope.myData = [];

  $scope.status = {
    isopen: false
    };

  var plotLocations = function(addresses) {
    $scope.map.addressMarkers=[];
    for (var i=0; i<addresses.length; i++) {
      var geo = addresses[i].geometry;
      $scope.myData.push({postcode: addresses[i].postcode,distance:0});

      $scope.map.addressMarkers.push({ id: i,
              latitude: addresses[i].pos.lat,
              longitude: addresses[i].pos.lng,
              showWindow: false});
    }
    $scope.map.center = {latitude:addresses[0].pos.lat,
      longitude:addresses[0].pos.lng};
  };
  $scope.activeArea ={};
  $scope.showParticipants=function(id) {
    $scope.activeArea=id;
    $http.get('/api/participants/in/'+id).success(function(dataSet) {
      
      plotLocations(dataSet.data);
    })
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.loadArea=function(id) {
    console.log(id);
  };

  google.maps.visualRefresh = true;
  /* define maps details */
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
    zoom: 7,
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
        var url = "/api/trips/compute/"+$scope.activeArea;
        url+='/'+lat+','+lon;
        console.log(url)
        $http.get(url).success(function(dataSet) {
          $scope.destinationAddress = dataSet.data.destination_address;
          for (var i=0; i<dataSet.data.distances.length;i++)
            $scope.myData[i].distance=dataSet.data.distances[i];
        });
      }
    }
  };

  $scope.map.addressMarkers=[];
  $scope.map.destinationMarker=[];


  $scope.gridOptions = { data: 'myData' };

/*
  $http({url:'/api/trips',method:'GET'})
  .success(function(data) {
     $scope.myData = data.addresses;//data;
     for (var i=0; i<0; i++) {//data.addresses.length; i++) {
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
*/
});