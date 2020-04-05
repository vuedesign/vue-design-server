// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
  async find(params) {
    const { ctx } = this;
    const { options, pagination } = ctx.helper.initListParams(params);
    const res = await ctx.model.User.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  async findOne(uuid) {
    const res = await this.ctx.model.User.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}) {
    const res = await this.ctx.model.User.create(data);
    return res;
  }

  async remove(uuid) {
    const res = await this.ctx.model.User.update({
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
    const user = await this.ctx.model.User.findOne({
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
    const res = await this.ctx.model.User.update(data, {
      where: {
        uuid
      }
    });
    return res[0];
  }
}

module.exports = UserService;