angular.module('docman.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', '$mdDialog',
    'Users', 'Auth',
    function($rootScope, $scope, $state, $mdDialog,
      Users, Auth) {
      // Logouts the user
      $scope.logout = function() {
        Users.logout(function(err, res) {
          if (!err && res) {
            delete $rootScope.currentUser;
            Auth.logout();
            $state.go('home');
          }
        });
      };

      // Edits the user
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

      // Opens the dialog for types
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

      // Opens the dialog for roles
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

      // Opens the create the document
      $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };

      // Opens the new role dialog
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

      // Opens the new type dialog
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

      // Opens the new document dialog
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
