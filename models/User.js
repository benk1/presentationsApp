const mongoose = require('mongoose');

const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  //_id: {type: String},

  name: {
    type: String, //name: Joi.string().min(3).required(),
    required: [true, 'Name field is required'],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String, //name: Joi.string().min(3).required(),
    required: [true, 'Email field is required'],
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String, //name: Joi.string().min(3).required(),
    required: [true, 'Password field is required'],
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get('jwtPrivateKey')
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
