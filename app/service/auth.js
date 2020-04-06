// app/service/auth.js
const Service = require('egg').Service;
const UUID = require('node-uuid');

class AuthService extends Service {
  async add(where = {}, defaults = {}) {
    const res = await this.ctx.model.Auth.findOrCreate({ where, defaults });
    return res;
  }

  async remove(uuid) {
    const res = await this.ctx.model.Auth.update({
      isDelete: 1,
      deletedAt: Date.now()
    }, {
      where: {
        uuid
      }
    });
    return res[0];
  }

  async destroy(uuid) {
    const user = await this.ctx.model.Auth.findOne({
      where: {
        uuid
      }
    });
    if (!user) {
      this.ctx.helper.error(`uuid = '${uuid}' not fount`);
      // throw new Error(`api_uuid = '${api_uuid}' not fount`);
    }
    const res = await user.destroy();
    return res
  }

  async update(data = {}, uuid) {
    Object.assign(data, {
      updatedAt: Date.now()
    });
    const res = await this.ctx.model.Auth.update(data, {
      where: {
        uuid
      }
    });
    return res[0];
  }
}

module.exports = AuthService;