const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const feedbackSchema = new Schema({
  __v: {type: Number, select: false},
  // 提交类型
  type: {type: String, required: true},
  // 提交用户 id
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  desc: {type: String, required: true},
  img_url: {type: 'array', itemType: 'string', required: false}
});

module.exports = model('Feedback', feedbackSchema);
