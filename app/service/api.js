// app/service/api.js
const Service = require('egg').Service;

class ApiService extends Service {
  async find(params) {
    const { ctx } = this;
    const { options, pagination } = ctx.helper.initListParams(params);
    const res = await ctx.model.Api.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  async findOne(uuid) {
    const res = await this.ctx.model.Api.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}) {
    console.log('service create', data);
    const res = await this.ctx.model.Api.create(data);
    return res;
  }
  async remove(uuid) {
    const res = await this.ctx.model.Api.update({
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
    const api = await this.ctx.model.Api.findOne({
      where: {
        uuid
      }
    });
    if (!api) {
      this.ctx.helper.error(`uuid = '${uuid}' not fount`);
      // throw new Error(`uuid = '${uuid}' not fount`);
    }
    const res = await api.destroy();
    return res
  }

  async update(data = {}, uuid) {
    Object.assign(data, {
      updatedAt: Date.now()
    });
    const res = await this.ctx.model.Api.update(data, {
      where: {
        uuid
      }
    });
    return res[0];
  }
}

module.exports = ApiService;
