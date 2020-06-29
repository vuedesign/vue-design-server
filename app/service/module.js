// app/service/module.js
const Service = require('egg').Service;
const UUID = require('node-uuid');

class ModuleService extends Service {
  /**
   * 校验字段重复服务
   * @param {*} options 
   */
  async check(options) {
    const Op = this.ctx.app.Sequelize.Op;
    const res = await this.ctx.model.Module.findOne({
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
    console.log('ctx.model', ctx.model);
    Object.assign(options.where, {
      isDelete: 0
    });
    Object.assign(options, {
      include:[
        {
          model: ctx.model.File
        }
      ]
    });
    // asc DESC
    const res = await ctx.model.Module.findAndCountAll(options);
    return Object.assign(res, { pagination });
  }

  /**
   * 查找项目详情服务
   * @param {*} uuid 
   */
  async findOne(uuid) {
    const res = await this.ctx.model.Module.findOne({
      where: {
        uuid
      }
    });
    return res
  }

  async create(data = {}, options = {}) {
    const { ctx } = this;
    Object.assign(data, {
      uuid: UUID.v1(),
      isDelete: 0,
      files: data.files.map(item => {
        Object.assign(item, {
          uuid: UUID.v4(),
          isDelete: 0
        });
        return item;
      })
    });

    console.log('data', data);
    
    Object.assign(options, {
      include:[
        {
          model: ctx.model.File
        }
      ]
    });
    const res = await ctx.model.Module.create(data, options);
    return res;
  }

  async remove(uuid) {
    const res = await this.ctx.model.Module.update({
      isDelete: 1
    }, {
      where: {
        uuid
      }
    });
    return res;
  }
  async destroy(uuid) {
    const module = await this.ctx.model.Module.findOne({
      where: {
        uuid
      }
    });
    if (!module) {
      this.ctx.helper.error(`uuid = '${uuid}' not fount`);
    }
    const res = await module.destroy();
    return res;
  }

  async update(data = {}, options = {}) {
    const { ctx } = this;
    Object.assign(data, {
      userId: ctx.session.user.userId,
      isDelete: 0
    });
    const res = await ctx.model.Module.update(data, options);
    return res
  }
}

module.exports = ModuleService;
