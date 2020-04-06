'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const ms = require('ms');

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const createRule = {
      name: { type: 'string', required: false },
      password:  { type: 'string', required: true },
      remember: { type: 'boolean', required: true }
    };
    ctx.validate(createRule);
    const { name, password, remember} = ctx.request.body;
    const res = await ctx.service.user.findOne({
      where: {
        [Op.or]: [{phone: name}, {username: name}],
        password
      }
    });
    console.log('res', res);
    if (res) {
      console.log('---q', res);
      const { id, username } = res;
      const user = {
        userId: id,
        username
      };
      const token = jwt.sign(user, ctx.app.config.jwtAuth.secret);
      const auth = await ctx.service.auth.add({
        userId: id
      }, {
        userId: id,
        token
      });
      if (auth) {
        ctx.session.user = user;
        ctx.session.token = token;
        if (remember) {
          ctx.session.maxAge = ms('7d');
        }
        ctx.body = ctx.helper.responseHandler({
          token
        });
      }
    }
    // ctx.body = ctx.helper.responseHandler(res);
  }
  async register() {
    const { ctx } = this;
    const createRule = {
      phone: { type: 'number', required: false },
      username: { type: 'string', required: true },
      password:  { type: 'string', required: true },
      checkPassword:  { type: 'string', required: true },
      remember: { type: 'boolean', required: true }
    };
    ctx.validate(createRule);
    const res = await ctx.service.user.create(ctx.request.body);
    ctx.body = ctx.helper.responseHandler(res);
  }

  async userinfo() {
    const { ctx } = this;
    if (ctx.session.user) {
      const res = await ctx.service.user.findOne({
        id: ctx.session.user.userId
      });
      ctx.body = ctx.helper.responseHandler(res);
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    ctx.body = ctx.helper.responseHandler(true);
  }
}

module.exports = AuthController;
