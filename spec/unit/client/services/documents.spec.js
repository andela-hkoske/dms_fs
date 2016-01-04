describe('Documents Service Test', function() {

  beforeEach(function() {
    module('docman');
  });

  var Documents, httpBackend;
  beforeEach(inject(function($injector) {
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
    Documents = $injector.get('Documents');
  }));

  describe('Documents unit tests', function() {
    describe('Documents.find unit tests', function() {
      it('find should be a function', function() {
        expect(Documents.find).toBeDefined();
        expect(typeof Documents.find).toBe('function');
      });
      it('should test success of find function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/documents/find').respond(200, {
          res: 'res'
        });
        Documents.find({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of find function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.when('POST', '/api/documents/find').respond(500, {
          err: 'err'
        });
        Documents.find({
          data: 'data'
        }, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Documents.findByLimit unit tests', function() {
      it('findByLimit should be a function', function() {
        expect(Documents.findByLimit).toBeDefined();
        expect(typeof Documents.findByLimit).toBe('function');
      });
      it('should test success of findByLimit function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/limit\/(.+)/, undefined,
          undefined, ['limit']).respond(200, {
          res: 'res'
        });
        Documents.findByLimit(10, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of findByLimit function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/limit\/(.+)/, undefined,
          undefined, ['limit']).respond(500, {
          err: 'err'
        });
        Documents.findByLimit(10, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Documents.findByRole unit tests', function() {
      it('findByLimit should be a function', function() {
        expect(Documents.findByRole).toBeDefined();
        expect(typeof Documents.findByRole).toBe('function');
      });
      it('should test success of findByRole function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/role\/(.+)\/(.+)/, undefined,
          undefined, ['role', 'limit']).respond(200, {
          res: 'res'
        });
        Documents.findByRole(10, 10, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of findByRole function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/role\/(.+)\/(.+)/, undefined,
          undefined, ['role', 'limit']).respond(500, {
          err: 'err'
        });
        Documents.findByRole(10, 10, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Documents.findByDate unit tests', function() {
      it('findByLimit should be a function', function() {
        expect(Documents.findByDate).toBeDefined();
        expect(typeof Documents.findByDate).toBe('function');
      });
      it('should test success of findByDate function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/date\/(.+)\/(.+)/, undefined,
          undefined, ['date', 'limit']).respond(200, {
          res: 'res'
        });
        Documents.findByDate('30/12/2015', 10, cb);
        httpBackend.flush();
        expect(response.res).toBeDefined();
        expect(response.res).toBe('res');
      });
      it('should test error of findByDate function', function() {
        var error, response;
        var cb = function(err, res) {
          if (err) {
            error = err;
            response = null;
          } else {
            error = null;
            response = res;
          }
        };
        httpBackend.whenPOST(/\/api\/documents\/date\/(.+)\/(.+)/, undefined,
          undefined, ['date', 'limit']).respond(500, {
          err: 'err'
        });
        Documents.findByDate('30/12/2015', 10, cb);
        httpBackend.flush();
        expect(error.err).toBeDefined();
        expect(error.err).toBe('err');
      });
    });

    describe('Documents.findByType unit tests', function() {
  it('findByType should be a function', function() {
    expect(Documents.findByType).toBeDefined();
    expect(typeof Documents.findByType).toBe('function');
  });
  it('should test success of findByType function', function() {
    var error, response;
    var cb = function(err, res) {
      if (err) {
        error = err;
        response = null;
      } else {
        error = null;
        response = res;
      }
    };
    httpBackend.whenPOST(/\/api\/documents\/type\/(.+)/, undefined,
      undefined, ['type']).respond(200, {
      res: 'res'
    });
    Documents.findByType(10, cb);
    httpBackend.flush();
    expect(response.res).toBeDefined();
    expect(response.res).toBe('res');
  });
  it('should test error of findByType function', function() {
    var error, response;
    var cb = function(err, res) {
      if (err) {
        error = err;
        response = null;
      } else {
        error = null;
        response = res;
      }
    };
    httpBackend.whenPOST(/\/api\/documents\/type\/(.+)/, undefined,
      undefined, ['type']).respond(500, {
      err: 'err'
    });
    Documents.findByType(10, cb);
    httpBackend.flush();
    expect(error.err).toBeDefined();
    expect(error.err).toBe('err');
  });
});

  });

});
