const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  products: {
    type: Array
  }
});

module.exports = OrderSchema;
