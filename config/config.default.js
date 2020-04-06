/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581856638041_3871';

  // add your middleware config here
  config.middleware = ['errorHandler', 'jwtAuth'];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
      match: '/'
  };

  config.jwtAuth = {
      secret: 'vue-design',
      ignores: ['register', 'login', 'logout']
  };

  config.validate = {
    convert: true,
    // validateRoot: false,
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false
    }
  };

  return config;
};
