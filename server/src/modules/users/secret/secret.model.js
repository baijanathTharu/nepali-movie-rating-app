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
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 120,
  },
});

module.exports = mongoose.model('secret', SecretModel);
