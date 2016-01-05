angular.module('docman.controllers')
  .controller('DocDialogController', 
  	['$scope', '$mdDialog', 'Types', 'Roles', 'Documents',
    function($scope, $mdDialog, Types, Roles, Documents) {
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
  ]);
