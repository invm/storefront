const mongoose = require('mongoose');

const ShopSchema = require('./Shop');

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    requiured: true
  },
  shops: [ShopSchema]
});

module.exports = mongoose.model('client', ClientSchema);
