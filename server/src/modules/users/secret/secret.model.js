const mongoose = require('mongoose');

const SecretModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: '120s',
  },
});

module.exports = mongoose.model('secret', SecretModel);
