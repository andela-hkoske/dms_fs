angular.module('docman.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', '$mdDialog',
    'Users', 'Auth',
    function($rootScope, $scope, $state, $mdDialog,
      Users, Auth) {
      // logout
      $scope.logout = function() {
        Users.logout(function(err, res) {
          if (!err && res) {
            delete $rootScope.currentUser;
            Auth.logout();
            $state.go('home');
          }
        });
      };

      $scope.editUser = function(ev) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'views/update-user.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      $scope.showTypes = function(ev) {
        $mdDialog.show({
            controller: 'TypesDialogController',
            templateUrl: 'views/types.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      $scope.showRoles = function(ev) {
        $mdDialog.show({
            controller: 'RolesDialogController',
            templateUrl: 'views/roles.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };

      $scope.newRole = function(ev) {
        $mdDialog.show({
            controller: 'NewRoleDialogController',
            templateUrl: 'views/newRole.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      $scope.newType = function(ev) {
        $mdDialog.show({
            controller: 'NewTypeDialogController',
            templateUrl: 'views/newType.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      $scope.createDoc = function(ev) {
        $mdDialog.show({
            controller: 'DocDialogController',
            templateUrl: 'views/newDoc.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };


    }
  ]);
