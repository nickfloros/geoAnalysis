'use strict';

angular.module('geoUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps',
  'ngGrid'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });