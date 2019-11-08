const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
  __v: {type: Number, select: false},
  name: {type: String, required: true},
  password: {type: String, required: true, select: false},
  avatar_url: {type: 'string', required: false},
  locations: {type: 'array', itemType: 'string', required: false}
});

module.exports = model('User', userSchema);
