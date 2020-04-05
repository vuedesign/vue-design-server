'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/api.test.js', () => {
  // test/controller/home.test.js
  it('should status 200 and get the request body', () => {
    // 模拟 CSRF token，下文会详细说明
    app.mockCsrf();
    return app.httpRequest()
      .get('/apis')
      .expect(200)
  });


  /*
  it('should status 200 and get the request body', () => {
    // 模拟 CSRF token，下文会详细说明
    app.mockCsrf();
    const data = {
      projectId: 1,
      apiUrl: '/api/v1/apis',
      apiName: 'apiData',
      apiMethod: 'post',
      apiDescription: '接口列表'
    };

    return app.httpRequest()
      .post('/apis')
      .type('form')
      .send(data)
      .expect(200)
      .expect(data);
  });
  */
});
