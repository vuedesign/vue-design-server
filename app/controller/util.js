'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
// const fs = require('mz/fs')
const md5 = require('blueimp-md5');

class UtilController extends Controller {
  getFileSuffix(filename) {
    return filename.split('.').pop();
  }
  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const fileinfo = fs.readFileSync(file.filepath);
    const suffix = this.getFileSuffix(file.filename);
    const name = `img_${new Date().getTime()}_${md5(fileinfo)}.${suffix}`;
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
      oldFileName: file.filename,
      mimeType: file.mimeType,
      url: target
    };
  }
}

module.exports = UtilController;
