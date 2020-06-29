const Controller = require('egg').Controller;

class ModuleController extends Controller {
  async check() {
    const { ctx } = this;
    const checkRule = {
      field: { type: 'string', required: true },
      value: { type: 'string', required: true },
      uuid: { type: 'uuid', required: false },
    };
    ctx.validate(checkRule, ctx.request.body);
    const res = await ctx.service.module.check(ctx.request.body);
    ctx.body = {
      code: 0,
      data: res
    };
  }

  async create() {
    const { ctx } = this;
    const createRule = {
      name: { type: 'string', required: true },
      description: { type: 'string', required: true },
      fileMap: { type: 'object', required: false },
      isMenu: { type: 'number', required: true },
      parentId: { type: 'number', required: true },
      files: { type: 'array', required: true }
    };
    ctx.validate(createRule);
    const res = await ctx.service.module.create(ctx.request.body);
    ctx.body = ctx.helper.responseHandler(res);
  }
  async list() {
    const { ctx } = this;
    const { query } = ctx;
    const listRule = {
      size: { type: 'number', required: false },
      page: { type: 'number', required: false }
    }
    ctx.validate(listRule, query);
    const res = await ctx.service.module.find({
      query
    });
    ctx.body = ctx.helper.responseHandler(res);
  }

  async detail() {
    // b9226fc0-5229-11ea-bb9a-8da47b2f8935
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await this.service.module.findOne(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  /**
   * 删除项目
   */
  async remove() {
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await ctx.service.module.remove(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async update() {
    const { ctx } = this;
    const { params } = ctx;
    const updateRule = {
      name: { type: 'string', required: true },
      description: { type: 'string', required: false },
      thumb: { type: 'string', required: false },
      logo: { type: 'string', required: false },
      tagId: { type: 'string', required: false },
      apiPrefixUrl: { type: 'string', required: false },
      package: { type: 'string', required: false },
      gitUrl: { type: 'string', required: false },
      metaTitle: { type: 'string', required: false },
      metaKeyword: { type: 'string', required: false },
      metaDescription: { type: 'string', required: false }
    };
    ctx.validate({ uuid: 'uuid' }, params);
    ctx.validate(updateRule);
    const res = await ctx.service.module.update(ctx.request.body, {
      where: {
        uuid: params.uuid
      }
    });
    ctx.body = ctx.helper.responseHandler(res);
  }
}
module.exports = ModuleController;