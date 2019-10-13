const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = require('./Order');

const StoreSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: Map,
    of: String
  },
  contact: {
    type: Map,
    of: String
  },
  size: {
    type: String,
    default: 'small'
  },
  orders: [OrderSchema]
});

module.exports = mongoose.model('store', StoreSchema);
