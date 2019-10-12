const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Product = require('./Product');

const OrderSchema = new Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stores'
  },
  date: {
    type: Date,
    default: Date.now
  },
  products: [Product],
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
  },
  sum: Number
});

module.exports = OrderSchema;
