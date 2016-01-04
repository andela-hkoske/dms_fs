describe('LoginCtrl Controller tests', function() {
  var scope,
    Users,
    controller, state, Auth, rootScope;

  beforeEach(function() {
    module('docman');
  });

  beforeEach(inject(function($injector, $rootScope) {
    var $controller = $injector.get('$controller');
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
        Users.login = sinon.stub();
        scope.login();
        expect(Users.login.called).toBe(true);
      });
    });
  });
});
