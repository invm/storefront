const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stores'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      name: String,
      quantityOrdered: Number,
      price: Number
    }
  ],
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
