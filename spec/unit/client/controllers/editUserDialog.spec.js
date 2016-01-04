describe('editUser DialogController tests', function() {
  var $rootScope, $scope, $mdDialog, Roles,
    Users, Auth, controller, httpBackend;

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
    httpBackend.whenPUT(/\/api\/users\/(.+)/,
      undefined, undefined, ['id']).respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    httpBackend.when('GET', '/api/roles').respond(200, [{
      res: 'res'
    }]);
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope;
    $mdDialog = $injector.get('$mdDialog');
    Roles = $injector.get('Roles');
    Users = $injector.get('Users');
    Auth = $injector.get('Auth');
    Roles.query = sinon.spy();
    controller = $controller('DialogController', {
      $scope: $scope
    });
  }));

  describe('editUser DialogController unit tests', function() {
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

    describe('Roles.query test', function() {
      it('Should define Roles.query', function() {
        httpBackend.flush();
        expect(Roles.query.called).toBe(true);
        Roles.query.args[0][0]('hannah');
        expect($scope.roles).toBeDefined();
        expect($scope.roles).toBe('hannah');
      });
    });

    describe('$scope.update test', function() {
      it('Should define $scope.update', function() {
        expect($scope.update).toBeDefined();
        Users.update = sinon.spy();
        httpBackend.flush();
        $scope.update();
        expect(Users.update.called).toBe(true);
        Auth.setToken = sinon.stub();
        $scope.user = {
          name: 'hannah',
          token: 'hannah'
        };
        Users.update.args[0][1]({
          name: 'hannah',
          token: 'hannah'
        });
        expect($rootScope.currentUser).toBeDefined();
        expect(Auth.setToken.called).toBe(true);
        expect($scope.message)
          .toBe('You have successfully updated this user\'s profile.');
        Users.update.args[0][2]();
        expect($scope.message)
          .toBe('There was a problem updating this profile.');
      });
    });

  });

});
