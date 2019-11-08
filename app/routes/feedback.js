const jwt = require('koa-jwt');
const Route = require('koa-router');
const router = Route({prefix: '/feedbacks'});

const {
  find, findByUserId, create, update,
  delete: del, checkOwner
} = require('../controllers/feedback');

const {secret} = require('../config');

// 在内部帮我们实现 token 提取 校验 及各种用户信息等
const auth = jwt({secret});

router.get('/', find);

router.get('/:id', findByUserId);

router.post('/', create);

router.patch('/:id', update);

router.delete('/:id', del);




module.exports = router;
