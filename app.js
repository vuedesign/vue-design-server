const path = require('path');

module.exports = app => {
  // 加载所有的校验规则
  const validate = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(validate, 'validate');
};
