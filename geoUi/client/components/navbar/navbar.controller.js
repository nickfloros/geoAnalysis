'use strict';

angular.module('geoUiApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.openModal=function() {
      alert('foo');
    };

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });