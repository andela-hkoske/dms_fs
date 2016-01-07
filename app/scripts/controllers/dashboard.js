angular.module('docman.controllers')
  .controller('DashboardCtrl', ['$scope', '$mdSidenav', '$mdMedia', '$mdDialog',
    'Users', 'Documents', 'Roles', 'Utils', 'Types',
    function($scope, $mdSidenav, $mdMedia,
      $mdDialog, Users, Documents, Roles, Utils, Types) {
      var chosenUser, chosenDoc;
      // Toggles the sidenav
      $scope.toggle = function() {
        $mdSidenav('left').toggle();
      };

      // Get the user details and the number of documents they created
      var initUsers = function() {
        Users.getUserDocs(function(err, res) {
          if (!err) {
            var docsNo = res;
            Users.query(function(users) {
              $scope.users = users;
              for (var i = 0, l = $scope.users.length; i < l; i++) {
                for (var j = 0, n = docsNo.length; j < n; j++) {
                  if (docsNo[j]._id === $scope.users[i]._id) {
                    $scope.users[i].docs = docsNo[j].count;
                  }
                }
              }
              $scope.users = $scope.users.map(function(value) {
                if (!value.docs) {
                  value.docs = 0;
                }
                return value;
              });
            });
          }
        });
      };

      initUsers();

      // Deletes a user
      var deleteUserFn = function() {
        Users.remove({
          id: $scope.selectedUser._id
        }, function() {
          Utils.toast('You have successfully deleted user: ' +
            $scope.selectedUser.username);
        });
        initUsers();
      };

      // Displays a dialog that seekd confirmation for user deletion
      $scope.deleteUser = function(event) {
        Utils.dialog('Warning: Delete User, ' +
          $scope.selectedUser.username + '?',
          'Are you sure you want to delete the user, ' +
          $scope.selectedUser.name.first + ' ' +
          $scope.selectedUser.name.last + '?',
          event, deleteUserFn
        );
      };

      // Deletes a document
      var deleteDocumentFn = function() {
        Documents.remove({
          id: $scope.selectedDoc._id
        }, function() {
          Utils.toast('You have successfully deleted document: ' +
            $scope.selectedDoc.title);
          delete $scope.doc;
          chosenDoc = undefined;
          $scope.selectedDoc = undefined;
          initDocs($scope.selectedUser._id);
          initUsers();
        });
      };

      // Displays a dialog that seekd confirmation for document deletion
      $scope.deleteDoc = function(event) {
        Utils.dialog('Warning: Delete Document, ' +
          $scope.selectedDoc.title + '?',
          'Are you sure you want to delete the document, ' +
          $scope.selectedDoc.title + '?',
          event, deleteDocumentFn
        );
      };

      // Gets documents for a selected user
      var initDocs = function(user) {
        Users.getDocs(user, function(err, res) {
          if (!err) {
            $scope.selectedDocs = res;
            for (var i = 0, l = $scope.selectedDocs.length; i < l; i++) {
              $scope.selectedDocs[i].created_at_st =
                new Date(Date.parse(
                  $scope.selectedDocs[i].created_at)).toDateString();
              $scope.selectedDocs[i].updated_at_st =
                new Date(Date.parse(
                  $scope.selectedDocs[i].updated_at)).toDateString();
            }
          }
        });
      };

      // Sets the selected user
      $scope.setUser = function(user) {
        $scope.selectedUser = user;
        chosenUser = user;
        $mdSidenav('left').close();
        initDocs(user._id);
      };

      // Sets the selected user on update of their details
      var setUpdatedUser = function(user) {
        $scope.selectedUser = user;
      };

      // Sets the selected document on update of its details
      var setUpdatedDoc = function(doc) {
        $scope.doc = doc;
        $scope.doc.access = (doc.roles.map(function(value) {
          return value.title;
        })).join();
        $scope.doc.created_at_st =
          new Date(Date.parse(
            $scope.doc.created_at)).toDateString();
        $scope.doc.updated_at_st =
          new Date(Date.parse(
            $scope.doc.updated_at)).toDateString();
        $scope.docErr = undefined;
      };

      // Sets the selected document
      $scope.setDoc = function(doc) {
        chosenDoc = doc;
        $scope.selectedDoc = doc;
        Documents.get({
            id: doc._id
          },
          function(res) {
            $scope.doc = {};
            $scope.doc = res;
            $scope.doc.access = (res.roles.map(function(value) {
              return value.title;
            })).join();
            $scope.doc.created_at_st =
              new Date(Date.parse(
                $scope.doc.created_at)).toDateString();
            $scope.doc.updated_at_st =
              new Date(Date.parse(
                $scope.doc.updated_at)).toDateString();
            $scope.docErr = undefined;
          },
          function(err) {
            $scope.docErr = err.data.message;
          });
      };

      // Controller for user update dialog
      function DialogController($scope, $mdDialog) {
        $scope.user = chosenUser;
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
          Users.update($scope.user, function() {
            setUpdatedUser($scope.user);
            $scope.message =
              'You have successfully updated this user\'s profile. ';
            initUsers();
          }, function() {
            $scope.message =
              'There was a problem updating this profile.';
          });
        };
      }

      $scope.userCtrl = DialogController;

      // Opens edit user dialog
      $scope.editUser = function(ev) {
        $mdDialog.show({
            controller: $scope.userCtrl,
            templateUrl: 'views/update-user.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

      // Controller for document update dialog
      function DocDialogController($scope, $mdDialog) {
        $scope.doc = chosenDoc;
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        var initRoles = function() {
          var roleIds = $scope.roles.map(function(value) {
            return value._id;
          });
          for (var i = 0, l = $scope.doc.roles.length; i < l; i++) {
            if (roleIds.indexOf($scope.doc.roles[i]._id) !== -1) {
              $scope.roles[roleIds.indexOf($scope.doc.roles[i]._id)].checked =
                true;
            }
          }
          $scope.roles = $scope.roles.map(function(value) {
            if (!value.checked) {
              value.checked = false;
            }
            return value;
          });
        };
        Roles.query(function(res) {
          $scope.roles = res;
          initRoles();
        });
        Types.query(function(res) {
          $scope.types = res;
        });
        $scope.update = function() {
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
          $scope.doc.access = roles.map(function(value) {
            return value.title;
          }).join();
          $scope.doc.roles = $scope.doc.roles.join(' ');
          $scope.doc.type = $scope.doc.type._id;
          Documents.update($scope.doc, function() {
            Documents.get({
              id: $scope.doc._id
            }, function(res) {
              $scope.doc = res;
              initRoles();
              setUpdatedDoc($scope.doc);
              initDocs($scope.doc.owner._id);
            });
            $scope.message =
              'You have successfully updated this document. ';
          }, function() {
            $scope.message =
              'There was a problem updating this document.';
          });
        };
      }

      $scope.docCtrl = DocDialogController;

      // Opens the edit document dialog
      $scope.editDoc = function(ev) {
        $mdDialog.show({
            controller: $scope.docCtrl,
            templateUrl: 'views/edit-document.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {}, function() {});
      };

    }
  ]);
