var Role = require('../models/role');

module.exports = {
  create: function(req, res) {
    var role = new Role({
      title: req.body.title
    });
    role.save(function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.errmsg || err
        });
      } else {
        return res.json({
          success: true,
          message: 'Successfully created a new role'
        });
      }
    });
  },

  update: function(req, res) {
    Role.findByIdAndUpdate(req.params.id, {
      title: req.body.title
    }, function(err) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else {
        return res.json({
          success: true,
          message: 'Successfully updated a role'
        });
      }
    });
  },

  getById: function(req, res) {
    Role.findById(req.params.id).exec(function(err, role) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!role) {
        return res.status(500).json({
          success: false,
          message: 'User role not found'
        });
      } else {
        return res.send(role);
      }
    });
  },

  remove: function(req, res) {
    Role.findByIdAndRemove(req.params.id,
      function(err, ok) {
        if (err) {
          return res.status(500).send(err.errmsg || err);
        } else if (ok) {
          return res.send({
            success: true,
            message: 'Successfully deleted role.'
          });
        }
      });
  },

  getAll: function(req, res) {
    Role.find({}).exec(function(err, roles) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!roles) {
        return res.status(500).json({
          success: false,
          message: 'Error accessing roles'
        });
      } else {
        return res.send(roles);
      }
    });
  },

  findByTitle: function(req, res) {
    Role.find({
      title: req.body.title
    }).exec(function(err, roles) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!roles) {
        return res.status(500).json({
          success: false,
          message: 'Error accessing role roles'
        });
      } else {
        return res.send(roles);
      }
    });
  }

};
