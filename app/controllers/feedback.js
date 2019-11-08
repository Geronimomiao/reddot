const FeedBack = require('../models/feedback');


class FeedBackCtl {
  // 查找所有反馈
  async find(ctx) {
    ctx.body = await FeedBack.find();
  }

  // 查找某个用户特定反馈
  async findByUserId(ctx) {
    const feedback = await FeedBack.find({user: ctx.params.id});
    ctx.body = feedback;
  }

  // 提交反馈信息
  async create(ctx) {
    ctx.verifyParams({
      type: {type: 'string', required: true},
      user: {type: 'string', required: true},
    });

    const feedback = await new FeedBack(ctx.request.body).save();

    ctx.body = feedback;
  }

  // 更新反馈信息
  async update(ctx) {

    const feedback = await FeedBack.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
    if (!feedback) {
      ctx.throw(404, '反馈信息不存在');
    }
    ctx.body = feedback;
  }

  // 删除反馈信息
  async delete(ctx) {
    const feedback = await FeedBack.findByIdAndRemove(ctx.params.id);
    if (!feedback) {
      ctx.throw(404, '反馈信息不存在');
    }
    ctx.status = 204;
  }



}

module.exports = new FeedBackCtl();
