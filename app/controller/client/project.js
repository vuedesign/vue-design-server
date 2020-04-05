const Controller = require('egg').Controller;
const UUID = require('node-uuid');

class ProjectController extends Controller {
  async create() {
    const { ctx } = this;
    const createRule = {
      uuid: { type: 'uuid', required: true },
      name: { type: 'string', required: true },
      description: { type: 'string', required: false },
      thumb: { type: 'string', required: false },
      logo: { type: 'string', required: false },
      tagId: { type: 'string', required: false },
      userId: { type: 'string', required: true },
      apiPrefixUrl: { type: 'string', required: false },
      package: { type: 'string', required: false },
      gitUrl: { type: 'string', required: false },
      metaTitle: { type: 'string', required: false },
      metaKeyword: { type: 'string', required: false },
      metaDescription: { type: 'string', required: false }
    };
    const data = Object.assign(ctx.request.body, {
      project_uuid: UUID.v1()
    });
    ctx.validate(createRule);
    const res = await ctx.service.project.create(data);
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
    const res = await ctx.service.project.find({
      query
    });
    ctx.body = ctx.helper.responseHandler(res);
  }

  async detail() {
    // b9226fc0-5229-11ea-bb9a-8da47b2f8935
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await this.service.project.findOne(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async remove() {
    const { ctx } = this;
    const { params } = ctx;
    ctx.validate({ uuid: 'uuid' }, params);
    const res = await this.service.project.remove(params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async update() {
    const { ctx } = this;
    const { params } = ctx;
    const updateRule = {
      project_name: { type: 'string', required: true },
      project_description: { type: 'string', required: false },
      project_thumb: { type: 'string', required: false },
      project_logo: { type: 'string', required: false },
      tag_id: { type: 'string', required: false },
      api_prefix_url: { type: 'string', required: false },
      package_json: { type: 'string', required: false },
      git_url: { type: 'string', required: false },
      meta_title: { type: 'string', required: false },
      meta_keyword: { type: 'string', required: false },
      meta_description: { type: 'string', required: false }
    };
    ctx.validate({ uuid: 'uuid' }, params);
    ctx.validate(updateRule);
    const res = await this.service.project.update(ctx.request.body, params.uuid);
    ctx.body = ctx.helper.responseHandler(res);
  }
}
module.exports = ProjectController;