'use strict';

const Controller = require('egg').Controller;
const glob = require('glob');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const models = await this.getList('model');
    const services = await this.getList('service');
    // mapOptionFieldNames('component');
    const api = await ctx.app.Sequelize;
    console.log('=====',api.Utils);
    const apis = this.getApiList(ctx.app.router.stack);
    ctx.body = {
      models,
      services,
      apis
    };
  }

  getApiList(stack) {
    let data = {};
    stack.map(item => {
      return {
        path: item.path,
        methods: item.methods
      };
    }).forEach(item => {
      if (data[item.path]) {
        data[item.path].push(...item.methods)
      } else {
        data[item.path] = item.methods;
      }
    });
    return Object.keys(data).map(path => {
      const methods = new Set(data[path]);
      return {
        path,
        methods: [...methods].filter(item => item !== 'HEAD')
      };
    });
  }

  getList(type) {
    return new Promise((resolve, reject) => {
      glob(`/${type}/*`, {
        root: `${this.app.baseDir}/app`
      }, function (er, files) {
        const fileList = files.map(item => item.split('/').pop())
        resolve(fileList);
      });
    });
  }
}

module.exports = HomeController;
