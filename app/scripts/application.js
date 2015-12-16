(function() {
  'use strict';
  angular.module('docman.controllers', []);
  angular.module('docman.services', []);
  angular.module('docman.filters', []);
  angular.module('docman.directives', []);

  window.app = angular.module('docman', [
    'docman.controllers',
    'docman.services',
    'docman.filters',
    'docman.directives',
    'ngRoute',
    'ui.router',
    'ngResource',
    'ngMaterial',
    'angularFileUpload'
  ]);

  window.app.run([
    function() {

      }
  ]);

  window.app.config(['$stateProvider', '$httpProvider',
   '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider,
     $locationProvider, $mdThemingProvider) {
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      // Now set up the states
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange')
        .backgroundPalette('grey', {
          default: '200'
        });

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();