// app/service/project.js
const Service = require('egg').Service;
const UUID = require('node-uuid');

class ProjectService extends Service {
  /**
   * 校验字段重复服务
   * @param {*} options 
   */
  async check(options) {
    const Op = this.ctx.app.Sequelize.Op;
    const res = await this.ctx.model.Project.findOne({
      where: {
        [options.field]: options.value,
        uuid: {
          [Op.ne]: options.uuid || ''
        }
      }
    });
    return !!res;
  }

  /**
   * 查找项目列表服务
   * @param {*} params 
   */
  async find(params) {
    const { ctx } = this;
    const { options, pagination } = ctx.helper.initListParams(params);
    Object.assign(options.where, {
      isDelete: 0
    });
    // asc DESC
    const res = await ctx.model.Project.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  /**
   * 查找项目详情服务
   * @param {*} uuid 
   */
  async findOne(uuid) {
    const res = await this.ctx.model.Project.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}) {
    const { ctx } = this;
    Object.assign(data, {
      uuid: UUID.v1(),
      userId: ctx.session.user.userId,
      isDelete: 0
    });
    const res = await ctx.model.Project.create(data);
    return res;
  }

  async remove(uuid) {
    const res = await this.ctx.model.Project.update({
      isDelete: 1
    }, {
      where: {
        uuid
      }
    });
    return res;
  }
  async destroy(uuid) {
    const project = await this.ctx.model.Project.findOne({
      where: {
        uuid
      }
    });
    if (!project) {
      this.ctx.helper.error(`uuid = '${uuid}' not fount`);
    }
    const res = await project.destroy();
    return res;
  }

  async update(data = {}, options = {}) {
    const { ctx } = this;
    Object.assign(data, {
      userId: ctx.session.user.userId,
      isDelete: 0
    });
    const res = await ctx.model.Project.update(data, options);
    return res
  }
}

module.exports = ProjectService;
