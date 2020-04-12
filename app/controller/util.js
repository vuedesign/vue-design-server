'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const md5 = require('blueimp-md5');

class UtilController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const fileinfo = fs.readFileSync(file.filepath);
    const name = `img_${new Date().getTime()}_${md5(fileinfo)}`;
    const target = path.join(this.config.baseDir, `app/public/upload/${name}`);
    try {
      await fs.writeFileSync(target, fileinfo);
    } catch (error) {
      throw error;
    } finally {
      await fs.unlink(file.filepath, err => {
        if (err) {
          throw err;
        }
        console.log('删除缓存文件:' + file.filepath + '成功！');
      });
      // ctx.cleanupRequestFiles();
    }
    ctx.body = {
      url: target,
      // get all field values
      requestBody: ctx.request.body,
    };
  }
}

module.exports = UtilController;
