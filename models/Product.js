const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  supplier: String,
  name: String,
  category: String,
  quantityInBox: { type: Number, default: 1 },
  price: Number
});

module.exports = mongoose.model('product', ProductSchema);
