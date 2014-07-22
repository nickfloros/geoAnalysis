'use strict';

angular.module('geoUiMapApp')
  .controller('NavbarCtrl',['$scope','$rootScope', '$location','tripService' ,function ($scope, $rootScope, $location,tripService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{'title':'x','link':'/'}];
   $scope.days = [
        {title:'Monday',id:1},
        {title:'Tuesday',id:2},
        {title:'Wednesday',id:3},
        {title:'Thursday',id:4},
        {title:'Friday',id:5},
        {title:'Saturday',id:6},
        {title:'Sunday',id:7}
    ];

    $scope.mapCmds = [{title:'Center',id:1},{title:'Clear',id:2}];
    $scope.searchBox="";

    $scope.trips=[];

    $scope.isCollapsed = true;
    $scope.selectedDays = 0;
    $scope.selectedTrip = -1;

    $scope.isDayActive = function(id) {
      return id === $scope.selectedDays;
    };

    $scope.isTripActive = function(id) {
      return id===$scope.selectedTrip;
    };

    $scope.dayCmd=function(id){
      alert($scope.days[id-1].title);
      $scope.selectedDays=id;
      $rootScope.$broadcast('get.weekdata',$scope.days[id-1].title);
    };

    $scope.mapCtrl=function(cmd) {
      console.log('mapCtrol : '+cmd);
  //    $rootScope.$broadcast('map.ctrl',cmd);
    }

    $scope.showTrip=function(id){
      var trip = tripService.getTrip().data[id];
      var msg = '#'+trip.trip_id +', distance : '+trip.odmDistace;
      alert(msg);
      $scope.selectedTrip = id;
    };

    $scope.search=function() {
      alert($scope.searchBox);
    };

    $rootScope.$on('new.trip',function(event) {
      var tripSet = tripService.getTrip().data;
      $scope.selectedTrip=-1;
      $scope.trips=[];
      for (var i=0; i<tripSet.length; i++){
        $scope.trips.push( {title:tripSet[i].trip_id.toString(),id:i});
      };
//      $scope.trips=newTrips;
    })
  
  }]);