angular.module('docman.controllers')
  .controller('DashboardCtrl', ['$scope', 'Users', 'Documents',
    function($scope, Users, Documents) {
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
      $scope.setUser = function(user) {
        $scope.selectedUser = user;
        Users.getDocs(user._id, function(err, res) {
          if (!err) {
            $scope.selectedDocs = res;
            for (var i = 0, l = $scope.selectedDocs.length; i < l; i++) {
              $scope.selectedDocs[i].created_at =
                new Date(Date.parse(
                  $scope.selectedDocs[i].created_at)).toDateString();
            }
          }
        });
      };
      $scope.setDoc = function(doc) {
        Documents.get({
            id: doc._id
          },
          function(res) {
            $scope.doc = {};
            $scope.doc.title = res.title;
            $scope.doc.type = res.type.title;
            $scope.doc.content = res.content;
            $scope.doc.access = (res.roles.map(function(value) {
              return value.title;
            })).join();
            $scope.docErr = undefined;
            console.log(res);
          },
          function(err) {
            $scope.docErr = err.data.message;
          });
      };

    }
  ]);
