'use strict';

angular.module('geoUiMapApp')
  .controller('NavbarCtrl',['$scope','$rootScope', '$location','$modal','tripService',
          function ($scope, $rootScope, $location,$modal,tripService) {
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

    $scope.mapCmds = [{title:'Options',id:0},{title:'Center',id:1},{title:'Clear',id:2}];
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
      switch (cmd) {
        case 0:
        var modalInstance = $modal.open({
    templateUrl: 'components/map/map.option.html',
    controller: DateModalInstanceCtrl
/*    resolve: {
        tripService: function () {
            return tripService;
        }
    }*/
});
modalInstance.result.then(function (paramFromDialog) {

    $scope.paramFromDialog = paramFromDialog;
    $rootScope.$broadcast('plot.pois');    
});
/*
          var modalInstance = $modal.open({
            templateUrl: 'components/map/map.option.html',
            controller: 'MapOptionsCtrl',
            size:'lg',
            resolve{
              tripService:function() { return tripService}
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });*/
        break;
        default:
        break;
      }
      console.log('mapCtrol : '+cmd);
  //    $rootScope.$broadcast('map.ctrl',cmd);
    };

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

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = ['items','itemsB','itemsc'];
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


var DateModalInstanceCtrl = function ($scope, $modalInstance, $timeout) {

$scope.dt = new Date();

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };
  $scope.options = {plotPois:true,
                          periodStart:null,
                          periodEnd:null,
                          tripId:null};
  $scope.plotPois=function() {
    $modalInstance.close($scope.options);
  }
  
  $scope.ok = function () {
    $scope.options.periodStart=$scope.dt;    
    $modalInstance.close($scope.options);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};