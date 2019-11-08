const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const feedbackSchema = new Schema({
  __v: {type: Number, select: false},
  type: {type: String, required: true},
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  desc: {type: String, required: true},
  img_url: {type: 'array', itemType: 'string', required: false}
});

module.exports = model('Feedback', feedbackSchema);
