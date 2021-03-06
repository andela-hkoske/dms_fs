describe('RolesDialogController tests', function() {
  var $scope, $mdDialog, Roles, Utils, httpBackend, controller;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    $scope = $injector.get('$rootScope');
    $mdDialog = $injector.get('$mdDialog');
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
    httpBackend.whenPUT(/\/api\/roles\/(.+)/, undefined, undefined, ['id'])
      .respond(200, {
        res: 'res'
      });
    httpBackend.whenDELETE(/\/api\/roles\/(.+)/, undefined, undefined, ['id'])
      .respond(200, {
        res: 'res'
      });
    httpBackend.when('GET', '/api/roles/').respond(200, [{
      res: 'res'
    }]);
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    Roles = $injector.get('Roles');
    Utils = $injector.get('Utils');
    Roles.query = sinon.spy();
    controller = $controller('RolesDialogController', {
      $scope: $scope
    });
  }));

  describe('RolesDialogController unit tests', function() {
    describe('$scope.hide test', function() {
      it('Should define $scope.hide', function() {
        expect($scope.hide).toBeDefined();
        $mdDialog.hide = sinon.stub();
        $scope.hide();
        expect($mdDialog.hide.called).toBe(true);
      });
    });

    describe('$scope.cancel test', function() {
      it('Should define $scope.cancel', function() {
        expect($scope.cancel).toBeDefined();
        $mdDialog.cancel = sinon.stub();
        $scope.cancel();
        expect($mdDialog.cancel.called).toBe(true);
      });
    });

    describe('$scope.select test', function() {
      it('Should define $scope.select', function() {
        expect($scope.select).toBeDefined();
        expect(typeof $scope.select).toBe('function');
        $scope.select('hannah');
        expect($scope.selectedRole).toBeDefined();
        expect($scope.selectedRole).toBe('hannah');
      });
    });

    describe('$scope.select test', function() {
      it('Should assert that Roles.query was called', function() {
        expect(Roles.query.called).toBe(true);
        Roles.query.args[0][0]();
      });
    });

    describe('$scope.update test', function() {
      it('Should define $scope.update', function() {
        expect($scope.update).toBeDefined();
        Roles.update = sinon.spy();
        $scope.update();
        httpBackend.flush();
        expect(Roles.update.called).toBe(true);
        Roles.update.args[0][1]();
        expect($scope.message).toBeDefined();
        expect($scope.message).toBe('You have successfully' +
          ' update the selected role');
        Roles.update.args[0][2]();
        expect($scope.message).toBe('There was a problem updating' +
          ' the selected role');
      });
    });

    describe('$scope.delete test', function() {
      it('Should define $scope.delete', function() {
        expect($scope.delete).toBeDefined();
        Roles.remove = sinon.spy();
        Utils.dialog = sinon.stub();
        Utils.toast = sinon.stub();
        var role = {
          title: 'title',
          _id: '_id'
        };
        $scope.delete(role, {
          event: 'event'
        });
        httpBackend.flush();
        expect(Utils.dialog.called).toBe(true);
        Utils.dialog.args[0][3]();
        expect(Roles.remove.called).toBe(true);
        Roles.remove.args[0][1]();
        Roles.remove.args[0][2]();
        expect(Utils.toast.calledTwice).toBe(true);
      });
    });

  });
});
