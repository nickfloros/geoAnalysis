'use strict';

angular.module('geoUiMapApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'ui.map',
  'ngGrid'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

function onGoogleReady() {
  console.log('google map api initialised');
  angular.bootstrap(document.getElementById("map"), ['geoUiMapApp']);
};