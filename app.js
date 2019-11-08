// const https = require('https');
// const enforceHttps = require('koa-sslify');
const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const paramter = require('koa-parameter');
const mongoose = require('mongoose');


const app = new Koa();

const routing = require('./app/routes');
const {connectionStr} = require('./app/config');

mongoose.connect(connectionStr, {useNewUrlParser: true}, () => console.log('MongoDB 连接成功'));
mongoose.connection.on('error', console.error);


// app.use(enforceHttps());
// var options = {
//   key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
//   cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
// };


app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    uploadDir: path.join(__dirname, '/app/public/uploads'), // 设置上传目录
    keepExtensions: true  // 保留文件扩展名
  }
}));
app.use(paramter(app));
routing(app);

app.listen(3000, () => {
  console.log('running at 3000');
});

// https.createServer(options, app.callback()).listen(3000);
