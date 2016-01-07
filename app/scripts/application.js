(function() {
  'use strict';
  // Sub-modules of the app
  angular.module('docman.controllers', []);
  angular.module('docman.services', []);
  angular.module('docman.filters', []);
  angular.module('docman.directives', []);

  // Services
  require('./services/users');
  require('./services/roles');
  require('./services/documents');
  require('./services/types');
  require('./services/token');
  require('./services/auth');
  require('./services/token-injector');
  require('./services/utils');

  // Controllers
  require('./controllers/editUserDialog');
  require('./controllers/newRole');
  require('./controllers/newType');
  require('./controllers/newDocument');
  require('./controllers/typesDialog');
  require('./controllers/rolesDialog');
  require('./controllers/dashboard');
  require('./controllers/login');
  require('./controllers/header');
  require('./controllers/signup');

  // Definition of docman app and its dependencies
  window.app = angular.module('docman', [
    'docman.controllers',
    'docman.services',
    'docman.filters',
    'docman.directives',
    'ngRoute',
    'ui.router',
    'ngResource',
    'ngMaterial'
  ]);

  // Checks if their is a currenly logged in user/ valid session
  window.app.run(['$rootScope', 'Users',
    function($rootScope, Users) {
      Users.session(function(err, res) {
        if (!err && res) {
          $rootScope.currentUser = res;
        }
      });
    }
  ]);

  window.app.config(['$stateProvider', '$httpProvider',
    '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider,
      $locationProvider, $mdThemingProvider) {
      // http interceptor to include token
      $httpProvider.interceptors.push('TokenInjector');

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      // The app theme
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue')
        .backgroundPalette('grey', {
          default: '200'
        });

      // The various states
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
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('signup', {
          url: '/users/signup',
          controller: 'SignupCtrl',
          templateUrl: 'views/signup.html'
        })
        .state('dashboard', {
          url: '/user/{id}/dashboard',
          controller: 'DashboardCtrl',
          templateUrl: 'views/dashboard.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();
