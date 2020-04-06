const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const createRule = {
      uuid: { type: 'uuid', required: true },
      username: { type: 'string', required: true, min: 2, max: 45 },
      email: { type: 'string', required: false, min: 2, max: 45 },
      phone: { type: 'string', required: false },
      password: { type: 'string', required: false }
    };
    const data = Object.assign(ctx.request.body, {
      projectUuid: UUID.v1()
    });
    ctx.validate(createRule);
    const res = await ctx.service.user.create(data);
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
    const res = await ctx.service.user.find({
      where: {},
      query
    });
    ctx.body = ctx.helper.responseHandler(res);
  }

  async detail() {
    // b9226fc0-5229-11ea-bb9a-8da47b2f8935
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await ctx.service.user.detail(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async remove() {
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await ctx.service.user.remove(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async update() {
    const { ctx } = this;
    const { params } = ctx;
    const updateRule = {
      username: { type: 'string', required: true, min: 2, max: 45 },
      email: { type: 'string', required: false, min: 2, max: 45 },
      phone: { type: 'string', required: false },
      password: { type: 'string', required: false }
    };
    ctx.validate({ uuid: 'uuid' }, params);
    ctx.validate(updateRule);
    const res = await ctx.service.user.update(ctx.request.body, params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }
}

module.exports = UserController;