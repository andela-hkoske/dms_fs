var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolesSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = mongoose.model('Roles', RolesSchema);
