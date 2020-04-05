// app/service/project.js
const Service = require('egg').Service;

class ProjectService extends Service {
  async find(params) {
    const { ctx } = this;
    const { options, pagination } = ctx.helper.initListParams(params);
    const res = await ctx.model.Project.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  async findOne(uuid) {
    const res = await this.ctx.model.Project.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}) {
    const res = await this.ctx.model.Project.create(data);
    return res;
  }

  async remove(uuid) {
    const res = await this.ctx.model.Project.update({
      is_delete: 1
    }, {
      where: {
        uuid
      }
    });
    return res;
  }
  async destroy(uuid) {
    const api = await this.ctx.model.Project.findOne({
      where: {
        uuid
      }
    })
    if (!api) {
      this.ctx.helper.error(`uuid = '${uuid}' not fount`);
      // throw new Error(`api_uuid = '${api_uuid}' not fount`);
    }
    const res = await api.destroy();
    return res
  }

  async update(data = {}, uuid) {
    const res = await this.ctx.model.Project.update(data, {
      where: {
        uuid
      }
    });
    return res
  }
}

module.exports = ProjectService;
