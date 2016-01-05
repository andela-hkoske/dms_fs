describe('LoginCtrl Controller tests', function() {
  var scope,
    Users,
    controller, state, Auth, rootScope, httpBackend;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector, $rootScope) {
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
    httpBackend.when('GET', 'views/home.html').respond(200, {});
    httpBackend.when('POST', '/api/users/login').respond(200, [{
      res: 'res'
    }]);
    Users = $injector.get('Users');
    rootScope = $rootScope;
    rootScope.currentUser = {};
    scope = $rootScope.$new();
    controller = $controller('LoginCtrl', {
      $rootScope: rootScope,
      $scope: scope
    });
    scope.user.username = 'JaneDoe97';
    scope.user.password = 'JaneDoe97';
    state = $injector.get('$state');
    Auth = $injector.get('Auth');
  }));

  describe('LoginCtrl Unit Tests', function() {
    describe('$scope.user tests', function() {
      it('Should define $scope.user', function() {
        expect(scope.user).toBeDefined();
        expect(scope.user.username).toBeDefined();
        expect(scope.user.password).toBeDefined();
      });
    });

    describe('$scope.login tests', function() {
      it('Should define $scope.login', function() {
        expect(scope.login).toBeDefined();
        Users.login = sinon.spy();
        Auth.setToken = sinon.stub();
        state.go = sinon.stub();
        scope.login();
        httpBackend.flush();
        expect(Users.login.called).toBe(true);
        Users.login.args[0][1](null, {
          user: {
            _id: '_id'
          }
        });
        expect(Auth.setToken.called).toBe(true);
        expect(state.go.called).toBe(true);
        expect(rootScope.currentUser).toBeDefined();
        expect(rootScope.currentUser._id).toBe('_id');
        Users.login.args[0][1]('error', null);
        expect(scope.message).toBeDefined();
        expect(scope.message).toBe('There was a problem logging you in.');
      });
    });
  });
});
