// app/service/file.js
const Service = require('egg').Service;

class ComponentService extends Service {
  async find(params) {
    const { ctx } = this;
    const { options, pagination } = ctx.helper.initListParams(params);
    const res = await ctx.model.Component.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  async findOne(uuid) {
    const res = await this.ctx.model.Component.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}) {
    console.log('service create', data);
    const res = await this.ctx.model.Component.create(data);
    return res;
  }
  async remove(uuid) {
    const res = await this.ctx.model.Component.update({
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
    const api = await this.ctx.model.Component.findOne({
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
    const res = await this.ctx.model.Component.update(data, {
      where: {
        uuid
      }
    });
    return res[0];
  }
}

module.exports = ComponentService;
