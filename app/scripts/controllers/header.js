angular.module('docman.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', '$mdDialog',
    'Users', 'Auth', 'Roles', 'Types',
    function($rootScope, $scope, $state, $mdDialog, Users, Auth, Roles, Types) {
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

      function DialogController($rootScope, $scope, $mdDialog) {
        $scope.user = $rootScope.currentUser;
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        Roles.query(function(res) {
          $scope.roles = res;
        });
        $scope.update = function() {
          Users.update($scope.user, function(res) {
            $rootScope.currentUser = $scope.user;
            Auth.setToken(res.token);
            $scope.message =
              'You have successfully updated this user\'s profile.';
          }, function() {
            $scope.message =
              'There was a problem updating this profile.';
          });
        };
      }

      $scope.editUser = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/update-user.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      function TypesDialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        var initTypes = function() {
          Types.query(function(res) {
            $scope.types = res;
          });
        };

        initTypes();
      }

      $scope.showTypes = function(ev) {
        $mdDialog.show({
            controller: TypesDialogController,
            templateUrl: 'views/types.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      function RolesDialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        var initRoles = function() {
          Roles.query(function(res) {
            $scope.roles = res;
          });
        };
        initRoles();
      }

      $scope.showRoles = function(ev) {
        $mdDialog.show({
            controller: RolesDialogController,
            templateUrl: 'views/roles.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };


    }
  ]);
