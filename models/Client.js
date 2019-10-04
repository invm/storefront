const mongoose = require('mongoose');

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
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'stores'
    }
  ]
});

module.exports = mongoose.model('client', ClientSchema);
