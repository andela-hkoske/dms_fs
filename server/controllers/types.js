var Type = require('../models/type');

module.exports = {
  create: function(req, res) {
    var type = new Type({
      title: req.body.title
    });
    type.save(function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.errmsg || err
        });
      } else {
        return res.json({
          success: true,
          message: 'Successfully created a new type'
        });
      }
    });
  },

  update: function(req, res) {
    Type.findByIdAndUpdate(req.params.id, {
      title: req.body.title
    }, function(err) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else {
        return res.json({
          success: true,
          message: 'Successfully updated a type'
        });
      }
    });
  },

  getById: function(req, res) {
    Type.findById(req.params.id).exec(function(err, type) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!type) {
        return res.status(500).json({
          success: false,
          message: 'User type not found'
        });
      } else {
        return res.send(type);
      }
    });
  },

  remove: function(req, res) {
    Type.findByIdAndRemove(req.params.id,
      function(err, ok) {
        if (err) {
          return res.status(500).send(err.errmsg || err);
        } else if (ok) {
          return res.send({
            success: true,
            message: 'Successfully deleted type.'
          });
        }
      });
  },

  getAll: function(req, res) {
    Type.find({}).exec(function(err, types) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!types) {
        return res.status(500).json({
          success: false,
          message: 'Error accessing type types'
        });
      } else {
        return res.send(types);
      }
    });
  },

  findByTitle: function(req, res) {
    Type.find({
      title: req.body.title
    }).exec(function(err, types) {
      if (err) {
        return res.status(500).send(err.errmsg || err);
      } else if (!types) {
        return res.status(500).json({
          success: false,
          message: 'Error accessing type types'
        });
      } else {
        return res.send(types);
      }
    });
  }
};
