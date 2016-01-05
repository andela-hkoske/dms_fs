describe('DashboardCtrl Controller tests', function() {
  var $scope, $mdSidenav, $mdMedia,
    $mdDialog, Users, Documents, Roles, Utils,
    Types, controller, httpBackend, $rootScope;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    httpBackend = $injector.get('$httpBackend');
    httpBackend.when('GET', '/api/users/session').respond(200, {
      '_id': '568398ce45817aad155f913f',
      'role': {
        '_id': '568398ce45817aad155f913c',
        'title': 'Administrator'
      },
      'username': 'JaneDoe97',
      'password': '$2a$10$927XnaPv8ou087KJBqpieeLMXqR' +
        '2Hx9kBzrdms9.R1hCrB4AoJzVK',
      'email': 'janedoe97@unknown.com',
      'name': {
        'last': 'Doe',
        'first': 'John'
      }
    });
    httpBackend.when('GET', '/api/users/').respond(200, [{
      res: 'res',
      _id: '_id'
    }]);
    httpBackend.when('GET', '/api/roles/').respond(200, [{
      res: 'res',
      _id: '_id',
      title: 'title'
    }]);
    httpBackend.when('GET', '/api/types/').respond(200, [{
      res: 'res',
      _id: '_id',
      title: 'title'
    }]);
    httpBackend.whenDELETE(/\/api\/users\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.whenDELETE(/\/api\/documents\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.whenPUT(/\/api\/users\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.whenPUT(/\/api\/documents\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.whenGET(/\/api\/documents\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', '/api/users/documents').respond(200, [{
      res: 'res',
      _id: '_id'
    }]);
    Users = $injector.get('Users');
    Users.getUserDocs = sinon.spy();
    Users.query = sinon.spy();
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope;
    $scope.selectedUser = {
      _id: '_id',
      name: {
        first: 'first',
        last: 'last'
      }
    };
    $scope.selectedDoc = {
      _id: '_id',
      title: 'title'
    };
    controller = $controller('DashboardCtrl', {
      $scope: $scope
    });
    $mdDialog = $injector.get('$mdDialog');
    $mdSidenav = $injector.get('$mdSidenav');
    $mdMedia = $injector.get('$mdMedia');
    Types = $injector.get('Types');
    Roles = $injector.get('Roles');
    Utils = $injector.get('Utils');
    Documents = $injector.get('Documents');
  }));

  describe('DashboardCtrl unit tests', function() {
    describe('$scope.toggle test', function() {
      it('Should test that $scope.toggle is defined', function() {
        expect($scope.toggle).toBeDefined();
      });
    });

    describe('Users.getUserDocs and Users.query in initUsers unit test',
      function() {
        it('getUserDocs and query should be functions and called', function() {
          expect(Users.getUserDocs).toBeDefined();
          expect(typeof Users.getUserDocs).toBe('function');
          expect(Users.getUserDocs.called).toBe(true);
          Users.getUserDocs.args[0][0](null, [{
            res: 'res',
            _id: '_id'
          }]);
          expect(Users.query.called).toBe(true);
          Users.query.args[0][0]([{
            res: 'res',
            _id: '_id'
          }]);
          expect($scope.users).toBeDefined();
        });
      });

    describe('$scope.deleteUser and deleteUserFn test', function() {
      it('Should test that $scope.deleteUser and deleteUserFn is defined',
        function() {
          expect($scope.deleteUser).toBeDefined();
          Utils.dialog = sinon.spy();
          $scope.deleteUser({
            _event: 'event'
          });
          expect(Utils.dialog.called).toBe(true);
          Utils.toast = sinon.spy();
          Users.remove = sinon.spy();
          Utils.dialog.args[0][3]();
          httpBackend.flush();
          expect(Users.remove.called).toBe(true);
          Users.remove.args[0][1]();
          expect(Utils.toast.called).toBe(true);
        });
    });

    describe('$scope.deleteDoc and deleteDocumentFn test', function() {
      it('Should test that $scope.deleteDoc and deleteDocumentFn is defined',
        function() {
          expect($scope.deleteDoc).toBeDefined();
          Utils.dialog = sinon.spy();
          $scope.deleteDoc({
            _event: 'event'
          });
          expect(Utils.dialog.called).toBe(true);
          Utils.toast = sinon.spy();
          Documents.remove = sinon.spy();
          Utils.dialog.args[0][3]();
          httpBackend.flush();
          expect(Documents.remove.called).toBe(true);
          Documents.remove.args[0][1]();
          expect(Utils.toast.called).toBe(true);
        });
    });

    describe('$scope.setUser test', function() {
      it('Should test that $scope.setUser is defined', function() {
        expect($scope.setUser).toBeDefined();
        Users.getDocs = sinon.spy();
        $scope.setUser($scope.selectedUser);
        expect($scope.selectedUser).toBeDefined();
        expect(Users.getDocs.called).toBe(true);
        Users.getDocs.args[0][1](null, [{
          _id: '_id',
          title: 'title',
          created_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)',
          updated_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)'
        }]);
        expect($scope.selectedDocs).toBeDefined();
      });
    });

    describe('$scope.setDoc test', function() {
      it('Should test that $scope.setDoc is defined', function() {
        expect($scope.setDoc).toBeDefined();
        expect(typeof $scope.setDoc).toBe('function');
        Documents.get = sinon.spy();
        var doc = {
          _id: '_id',
          title: 'title',
          created_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)',
          updated_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)',
          roles: [{
            title: 'title'
          }]
        };
        $scope.setDoc(doc);
        expect(Documents.get.called).toBe(true);
        Documents.get.args[0][1](doc);
        expect($scope.doc).toBeDefined();
        expect($scope.doc.access).toBeDefined();
        expect($scope.doc.created_at_st).toBeDefined();
        expect($scope.doc.updated_at_st).toBeDefined();
        Documents.get.args[0][2]({
          data: {
            message: 'err'
          }
        });
        expect($scope.docErr).toBeDefined();
      });
    });

    describe('$scope.editUser test', function() {
      it('Should define $scope.editUser', function() {
        expect($scope.editUser).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.spy();
        $scope.editUser();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        $mdDialog.then.args[0][0]();
        $mdDialog.then.args[0][1]();
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.userCtrl test', function() {
      it('Should test that $scope.userCtrl is defined', function() {
        expect($scope.userCtrl).toBeDefined();
        Roles.query = sinon.spy();
        $scope.userCtrl($rootScope, $mdDialog);
        httpBackend.flush();
        expect(Roles.query.called).toBe(true);
        $scope.userCtrl = sinon.spy();
        $scope.userCtrl($rootScope, $mdDialog);
        expect($scope.userCtrl.args[0][0].hide).toBeDefined();
        expect($scope.userCtrl.args[0][0].update).toBeDefined();
        expect($scope.userCtrl.args[0][0].cancel).toBeDefined();
        $mdDialog.hide = sinon.stub();
        $scope.userCtrl.args[0][0].hide();
        expect($mdDialog.hide.called).toBe(true);
        $mdDialog.cancel = sinon.stub();
        $scope.userCtrl.args[0][0].cancel();
        expect($mdDialog.cancel.called).toBe(true);
        Roles.query.args[0][0]('res');
        expect($scope.userCtrl.args[0][0].roles).toBeDefined();
        Users.update = sinon.spy();
        $scope.userCtrl.args[0][0].update();
        expect(Users.update.called).toBe(true);
        $scope.userCtrl.args[0][0].user = $scope.selectedUser;
        Users.update.args[0][1]();
        expect($scope.userCtrl.args[0][0].message)
          .toBe('You have successfully updated this user\'s profile. ');
        Users.update.args[0][2]();
        expect($scope.userCtrl.args[0][0].message)
          .toBe('There was a problem updating this profile.');
      });
    });

    describe('$scope.editDoc test', function() {
      it('Should define $scope.editDoc', function() {
        expect($scope.editDoc).toBeDefined();
        $mdDialog.show = sinon.stub().returns($mdDialog);
        $mdDialog.then = sinon.spy();
        $scope.editDoc();
        expect($mdDialog.show.called).toBe(true);
        expect(typeof $mdDialog.show.args[0][0]).toBe('object');
        expect($mdDialog.then.called).toBe(true);
        expect($mdDialog.then.args[0].length).toBe(2);
        $mdDialog.then.args[0][0]();
        $mdDialog.then.args[0][1]();
        expect(typeof $mdDialog.then.args[0][0]).toBe('function');
        expect(typeof $mdDialog.then.args[0][1]).toBe('function');
      });
    });

    describe('$scope.docCtrl test', function() {
      it('Should test that $scope.docCtrl is defined', function() {
        expect($scope.docCtrl).toBeDefined();
        Roles.query = sinon.spy();
        Types.query = sinon.spy();
        $scope.docCtrl($rootScope, $mdDialog);
        httpBackend.flush();
        expect(Roles.query.called).toBe(true);
        expect(Types.query.called).toBe(true);
        $scope.docCtrl = sinon.spy();
        $scope.docCtrl($rootScope, $mdDialog);
        var docCtrlScope = $scope.docCtrl.args[0][0];
        expect(docCtrlScope.hide).toBeDefined();
        expect(docCtrlScope.cancel).toBeDefined();
        expect(docCtrlScope.update).toBeDefined();
        $mdDialog.hide = sinon.stub();
        docCtrlScope.hide();
        expect($mdDialog.hide.called).toBe(true);
        $mdDialog.cancel = sinon.stub();
        docCtrlScope.cancel();
        expect($mdDialog.cancel.called).toBe(true);
        docCtrlScope.doc = {
          _id: '_id',
          title: 'title',
          created_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)',
          updated_at: 'Tue Jan 05 2016 10:57:55 GMT+0300 (EAT)',
          roles: [{
            title: 'title',
            _id: '_id'
          }],
          type: {
            title: 'title',
            _id: '_id'
          }
        };
        Roles.query.args[0][0]([{
          title: 'title',
          _id: '_id'
        }]);
        expect(docCtrlScope.roles).toBeDefined();
        Types.query.args[0][0]([{
          title: 'title',
          _id: '_id'
        }]);
        expect(docCtrlScope.types).toBeDefined();
        Documents.update = sinon.spy();
        docCtrlScope.update();
        expect(Documents.update.called).toBe(true);
        Documents.get = sinon.spy();
        Documents.update.args[0][1]();
        expect(Documents.get.called).toBe(true);
        docCtrlScope.doc.owner = {
          _id: '_id'
        };
        docCtrlScope.doc.roles = [{
          title: 'title',
          _id: '_id'
        }];
        Documents.get.args[0][1](docCtrlScope.doc);
        expect(docCtrlScope.message)
          .toBe('You have successfully updated this document. ');
        Documents.update.args[0][2]();
        expect(docCtrlScope.message)
          .toBe('There was a problem updating this document.');

      });
    });

  });
});
