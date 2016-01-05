angular.module('docman.controllers')
  .controller('NewTypeDialogController', ['$scope', '$mdDialog', 'Types',
    function($scope, $mdDialog, Types) {
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
  ]);
