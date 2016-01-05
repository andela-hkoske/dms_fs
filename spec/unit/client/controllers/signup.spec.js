describe('SignupCtrl Controller tests', function() {
  var scope,
    Users,
    controller, Auth, Roles, httpBackend;

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
    httpBackend.when('GET', '/api/roles/').respond(200, {
      res: 'res'
    });
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    httpBackend.when('POST', '/api/users/').respond(200, {
      res: 'res'
    });
    Users = $injector.get('Users');
    Roles = $injector.get('Roles');
    scope = $injector.get('$rootScope');
    Roles.query = sinon.spy();
    controller = $controller('SignupCtrl', {
      $scope: scope
    });
    Auth = $injector.get('Auth');
  }));

  describe('SignupCtrl Unit Tests', function() {
    describe('$scope.user tests', function() {
      it('Should define $scope.user', function() {
        expect(scope.user).toBeDefined();
      });
    });

    describe('Roles.query tests', function() {
      it('Should find that Roles.query is called', function() {
        expect(Roles.query.called).toBe(true);
        Roles.query.args[0][0]('hannah');
        expect(scope.roles).toBeDefined();
        expect(scope.roles).toBe('hannah');
      });
    });

    describe('$scope.save tests', function() {
      it('Should find that Roles.query is called', function() {
        Users.save = sinon.spy();
        scope.save();
        httpBackend.flush();
        expect(Users.save.called).toBe(true);
        expect(typeof Users.save.args[0][1]).toBe('function');
        Users.save.args[0][1]();
        expect(scope.message).toBe('Successfully signed up. You will now' +
          ' be redirected to login. Login to proceed.');
        Users.save.args[0][2]({
          data: {
            message: 'err'
          }
        });
        expect(scope.message).toBe('err');
        Users.save.args[0][2]({
          data: 'err'
        });
        expect(scope.message).toBe('There was a problem signing you up. ' +
          'Try again with different credentials.');
      });
    });

  });

});
