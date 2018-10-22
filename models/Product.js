const mongoose = require('mongoose');
const Schema = mongoose.Schema;


ProductSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Product = mongoose.model('products', ProductSchema)
