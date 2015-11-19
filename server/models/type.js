var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypesSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = mongoose.model('Types', TypesSchema);
