var Document = require('../models/document');
var getId = function(url) {
  var parts = url.split('/');
  parts.splice(0, 1);
  if (parts[2] === 'limit' || parts[2] === 'role' ||
   parts[2] === 'date' || parts[2] === 'type' || parts[2] === 'find') {
    return undefined;
  } else {
    return parts[2];
  }
};

module.exports = {
  authView: function(req, res, next) {
    if (req.decoded.role.title === 'Viewer') {
      return res.status(403).send({
        success: false,
        message: 'Forbidden. You are not allowed to carry out this action.' +
          ' You need to be a User or Administrator.'
      });
    } else {
      next();
    }
  },

  authUser: function(req, res, next) {
    if (getId(req.originalUrl)) {
      var id = getId(req.originalUrl);
      Document.findById(id).exec(function(err, document) {
        if (err) {
          res.status(500).send(err);
        } else {
          if (document.owner !== req.decoded._id &&
            req.decoded.role.title === 'User') {
            return res.status(403).send({
              success: false,
              message: 'Forbidden. You are not allowed to carry out this' +
                ' action. You need to be an Administrator.'
            });
          } else {
            next();
          }
        }
      });
    } else {
      next();
    }
  },

  authAccess: function(req, res, next) {
    var grant = false;
    if (getId(req.originalUrl)) {
      var id = getId(req.originalUrl);
      Document.findById(id)
        .populate('roles')
        .exec(function(err, document) {
          if (err) {
            return res.status(500).send(err);
          } else {
            for (var i = 0, l = document.roles.length; i < l; i++) {
              if (document.roles[i].title === req.decoded.role.title) {
                grant = true;
                break;
              }
            }
            if (!grant && req.decoded.role.title !== 'Administrator') {
              return res.status(403).send({
                success: false,
                message: 'Forbidden. You are not allowed to carry out this' +
                  ' action. Your role is not provided for in the' +
                  ' access of this document.'
              });
            } else {
              next();
            }
          }
        });
    } else {
      next();
    }
  },

  save: function(req, res) {
    var document = new Document({
      owner: req.decoded._id,
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      roles: (req.body.roles).trim().split(' ')
    });

    document.save(function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err
        });
      } else {
        return res.json({
          success: true,
          message: 'Document has been saved!'
        });
      }
    });
  },

  getAll: function(req, res) {
    Document.find({})
      .populate('owner')
      .populate('roles')
      .populate('type')
      .exec(function(err, documents) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(documents);
      });
  },

  getByLimit: function(req, res) {
    Document.find({})
      .populate('owner')
      .populate('roles')
      .populate('type')
      .limit(req.params.limit)
      .sort([
        ['created_at', 'descending']
      ]).exec(function(err, documents) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(documents);
      });
  },

  getByRole: function(req, res) {
    Document.find({
        roles: req.params.role
      })
      .populate('owner')
      .populate('roles')
      .populate('type')
      .limit(req.params.limit)
      .sort([
        ['created_at', 'descending']
      ]).exec(function(err, documents) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(documents);
      });
  },

  getByDate: function(req, res) {
    var day = new Date(Date.parse(req.params.date)).getDate();
    var month = new Date(Date.parse(req.params.date)).getMonth();
    var year = new Date(Date.parse(req.params.date)).getFullYear();
    Document.find({
        created_at: //new Date(req.params.date)
        {
          $gt: new Date(year, month, day - 1),
          $lt: new Date(year, month, day + 1)
        }
      })
      .populate('owner')
      .populate('roles')
      .populate('type')
      .limit(req.params.limit)
      .sort([
        ['created_at', 'descending']
      ]).exec(function(err, documents) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(documents);
      });
  },

  getByType: function(req, res) {
    Document.find({
        type: req.params.type
      })
      .populate('owner')
      .populate('roles')
      .populate('type')
      .sort([
        ['created_at', 'descending']
      ]).exec(function(err, documents) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(documents);
      });
  },

  getById: function(req, res) {
    Document.findById(req.params.id)
      .populate('owner')
      .populate('roles')
      .populate('type')
      .exec(function(err, document) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(document);
      });
  },

  findByTitle: function(req, res) {
    Document
      .find({
        title: req.body.title
      })
      .populate('owner')
      .populate('roles')
      .populate('type')
      .exec(function(err, document) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(document);
      });
  },

  delete: function(req, res) {
    Document.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({
        success: true,
        message: 'Successful deletion of document!'
      });
    });
  },

  update: function(req, res) {
    var doc_upd, roles;
    if (req.body.roles) {
      roles = req.body.roles.split(' ');
    }
    Document
      .findById(req.params.id)
      .exec(function(err, document) {
        if (err) {
          return res.status(500).send(err);
        }
        doc_upd = {
          owner: req.body.user || document.owner,
          title: req.body.title || document.title,
          content: req.body.content || document.content,
          roles: roles || document.roles,
          type: req.body.type || document.type
        };

        Document.findByIdAndUpdate(
          req.params.id, doc_upd,
          function(err) {
            if (err) {
              return res.status(500).send(err.errmsg || err.message || err);
            } else {
              return res.json({
                success: true,
                message: 'Successfully updated your document'
              });
            }
          });
      });
  }
};
