const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email id'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required'],
    validate: {
      validator: function (pw) {
        return pw === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
