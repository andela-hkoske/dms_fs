var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  created_at: {
    type: Date
  },

  updated_at: {
    type: Date
  },

  title: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  content: {
    type: String,
    required: true
  },

  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  }],

  type: {
    type: Schema.Types.ObjectId,
    ref: 'Types',
    required: true
  }
});

DocumentSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});


module.exports = mongoose.model('Document', DocumentSchema);
