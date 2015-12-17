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

  window.app.run(['$rootScope',
    function($rootScope) {
      $rootScope.menu = [{
        name: 'About',
        state: 'about'
      }, {
        name: 'Login',
        state: 'login'
      }, {
        name: 'Dashboard',
        state: 'dashboard'
      }];
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
        .primaryPalette('pink')
        .accentPalette('indigo')
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
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html'
        })
        .state('login', {
          url: '/users/login',
          templateUrl: 'views/login.html'
        })
        .state('signup', {
          url: '/users/signup',
          templateUrl: 'views/signup.html'
        })
        .state('dashboard', {
          url: '/user/0/dashboard',
          templateUrl: 'views/dashboard.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();
