const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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
  passwordModifiedDate: Date,
});

userSchema.pre('save', async function (next) {
  // Only runs if the password field is changed
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // No need to show passwordConfirm field in DB
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.passwordModifiedDate = Date.now();
  } else return next();
});

userSchema.methods.checkPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.isPasswordChanged = function (tokenDate) {
  if (this.passwordModifiedDate) {
    return parseInt(this.passwordModifiedDate.getTime() / 1000, 10) > tokenDate;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
