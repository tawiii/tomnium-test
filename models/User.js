const mongoose = require('mongoose');
const Schema = mongoose.Schema;


userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('users', userSchema)
