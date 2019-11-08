const fs = require('fs');

module.exports = {
  connectionStr: 'mongodb://wsm:Reddot666@top.wsmpage.cn:27017/reddot',
  secret: 'Geronimomiao',
  options: {
    key: fs.readFileSync(__dirname + '/ssl/server.key'),
    cert: fs.readFileSync(__dirname + '/ssl/server.pem')
  }
};
