const mongoose = require('mongoose');

const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1, // 0 = admin, 1 = normal user, 3 = visitor
      enum: [0, 1, 2],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    dob: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    image: String,
    address: {
      tempAddress: [String],
      permAddress: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserModel);
