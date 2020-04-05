const Controller = require('egg').Controller;
const UUID = require('node-uuid');
const constantsEnum = require('../../constants/enum');

class ApiController extends Controller {
  async create() {
    const { ctx } = this;
    const createRule = {
      uuid: { type: 'uuid', required: true },
      projectId: { type: 'number', required: true },
      url: { type: 'string', required: true, min: 2, max: 45 },
      name: { type: 'string', required: true, min: 2, max: 45 },
      method: { type: 'enum', values: constantsEnum.methods, required: true },
      description: { type: 'string', required: true }
    };
    const data = Object.assign(ctx.request.body, {
      uuid: UUID.v1()
    });
    ctx.validate(createRule);
    const res = await ctx.service.api.create(data);
    ctx.body = ctx.helper.responseHeadler(res);
  }

  async list() {
    const { ctx } = this;
    const { query } = ctx;
    const listRule = {
      size: { type: 'number', required: false },
      page: { type: 'number', required: false }
    }
    ctx.validate(listRule, query);
    const res = await ctx.service.api.find({
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
    const res = await this.service.api.findOne(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async remove() {
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await this.service.api.remove(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async update() {
    const { ctx } = this;
    const { params } = ctx;
    const updateRule = {
      projectId: { type: 'number', required: true },
      url: { type: 'string', required: true, min: 2, max: 45 },
      name: { type: 'string', required: true, min: 2, max: 45 },
      method: { type: 'enum', values: ['get', 'post', 'put', 'patch', 'delete'], required: true },
      description: { type: 'string', required: true }
    };
    ctx.validate({ uuid: 'uuid' }, params);
    ctx.validate(updateRule);
    const res = await this.service.api.update(ctx.request.body, params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }
}
module.exports = ApiController;