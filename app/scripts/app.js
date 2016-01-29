'use strict';

/**
 * @ngdoc overview
 * @name goSafeApp
 * @description
 * # goSafeApp
 *
 * Main module of the application.
 */
angular
  .module('goSafeApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'uiGmapgoogle-maps',
    'geolocation',
    'frontEndServices'
  ])
  .config(function ($routeProvider, $httpProvider, uiGmapGoogleMapApiProvider, $resourceProvider) {
    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'weather, geometry, visualization'
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });
