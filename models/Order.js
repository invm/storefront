const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  supplier: String,
  name: String,
  quantity: { type: Number, default: 1 }
});

const OrderSchema = new Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops'
  },
  date: {
    type: Date,
    default: Date.now
  },
  products: [ProductSchema],
  status: {
    type: Boolean,
    default: true
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  signedBy: {
    name: String,
    phone: String
  }
});

module.exports = OrderSchema;
