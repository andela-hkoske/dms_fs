angular.module('docman.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', '$mdDialog',
    'Users', 'Auth', 'Roles', 'Types', 'Utils', 'Documents',
    function($rootScope, $scope, $state, $mdDialog, 
      Users, Auth, Roles, Types, Utils, Documents) {
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
        var initTypes = function() {
          Types.query(function(res) {
            $scope.types = res;
          });
        };
        initTypes();
        $scope.select = function(type) {
          $scope.selectedType = type;
        };
        $scope.update = function() {
          Types.update($scope.selectedType,
            function() {
              $scope.message =
                'You have successfully update the selected type';
              initTypes();
            },
            function() {
              $scope.message =
                'There was a problem updating the selected type';
            });
        };
        $scope.delete = function(type, ev) {
          Utils.dialog('Warning: delete type ' + type.title,
            'Are you sure you want to delete the selected type ' +
            type.title + '?', ev,
            function() {
              Types.remove({
                  id: type._id
                }, function() {
                  Utils.toast(
                    'You have successfully deleted the selected type.');
                  initTypes();
                },
                function() {
                  Utils.toast(
                    'There was a problem deleting the selected type.');
                });
            });
        };

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
        var initRoles = function() {
          Roles.query(function(res) {
            $scope.roles = res;
          });
        };
        initRoles();
        $scope.select = function(role) {
          $scope.selectedRole = role;
        };
        $scope.update = function() {
          Roles.update($scope.selectedRole,
            function() {
              $scope.message =
                'You have successfully update the selected role';
              initRoles();
            },
            function() {
              $scope.message =
                'There was a problem updating the selected role';
            });
        };
        $scope.delete = function(role, ev) {
          Utils.dialog('Warning: delete role ' + role.title,
            'Are you sure you want to delete the selected role ' +
            role.title + '?', ev,
            function() {
              Roles.remove({
                  id: role._id
                }, function() {
                  Utils.toast(
                    'You have successfully deleted the selected role.');
                  initRoles();
                },
                function() {
                  Utils.toast(
                    'There was a problem deleting the selected role.');
                });
            });
        };
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

      $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };

      function NewRoleDialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function() {
          Roles.save({
            title: $scope.title
          }, function() {
            $scope.message = 'You have successfully created this role';
          }, function() {
            $scope.message = 'There was a problem creating a role. ' + 
            'Try again or change the name of the role.';
          });
        };
      }

      $scope.newRole = function(ev) {
        $mdDialog.show({
            controller: NewRoleDialogController,
            templateUrl: 'views/newRole.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      function NewTypeDialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function() {
          Types.save({
            title: $scope.title
          }, function() {
            $scope.message = 'You have successfully created this type';
          }, function() {
            $scope.message = 'There was a problem creating a type. ' + 
            'Try again or change the name of the type.';
          });
        };
      }

      $scope.newType = function(ev) {
        $mdDialog.show({
            controller: NewTypeDialogController,
            templateUrl: 'views/newType.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      function DocDialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        Roles.query(function(res) {
          $scope.roles = res;
        });
        Types.query(function(res) {
          $scope.types = res;
        });
        $scope.create = function() {
          var roles = $scope.roles.map(function(value) {
            if (value.checked) {
              delete value.checked;
              return value;
            } else {
              return ',';
            }
          }).sort();
          roles.splice(0, roles.lastIndexOf(',') + 1);
          $scope.doc.roles = roles.map(function(value) {
            return value._id;
          });
          $scope.doc.roles = $scope.doc.roles.join(' ');
          $scope.doc.type = $scope.doc.type._id;
          Documents.save($scope.doc, function() {
            $scope.message =
              'You have successfully created this document. ';
          }, function() {
            $scope.message =
              'There was a problem creating this document.';
          });
        };
      }

      $scope.createDoc = function(ev) {
        $mdDialog.show({
            controller: DocDialogController,
            templateUrl: 'views/newDoc.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };


    }
  ]);
