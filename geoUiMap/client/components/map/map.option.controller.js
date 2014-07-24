'use strict';
angular.module('geoUiMapApp')
  .controller('MapOptionsCtrl',[
  		 function ($scope, $modalInstance, tripService) {


  	$scope.close=function() {
			$modal.close($scope.selected.item);
  	};

  	$scope.on('open.map.modal',function() {

  	});
  }]);

angular.module('geoUiMapApp').controller('TheDialogController',function($scope, $modalInstance, tripService) {

	$scope.valuePassed='foo';
  $scope.dt = new Date();
  $scope.opened=false;

  $scope.open = function() {
    //$timeout(function() {
      $scope.opened = true;
    //});
  };

  $scope.plotPois=function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.ok = function () {
    $modalInstance.close($scope.dt);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});