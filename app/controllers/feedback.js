const FeedBack = require('../models/feedback');


class FeedBackCtl {
  // 查找所有反馈
  async find(ctx) {
    ctx.body = await FeedBack.find();
  }

  // 查找某个用户特定反馈
  async findById(ctx) {
    const user = await User.findById(ctx.params.id);

    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  // 提交反馈信息
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
    });
    const {name} = ctx.request.body;
    const repeatedUser = await User.findOne({name});
    if (repeatedUser) {
      ctx.throw(409, '用户名被占用')
    }
    const user = await new User(ctx.request.body).save();
    const {_id } = user;
    ctx.body = {name, _id};
  }

  // 更新反馈信息
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false},
      password: {type: 'string', required: false},
      avatar_url: {type: 'string', required: false}
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  // 删除反馈信息
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }



  // 确定是用户自己执行该操作
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }


}

module.exports = new FeedBackCtl();
