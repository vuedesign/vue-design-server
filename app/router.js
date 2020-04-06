'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.put('/api/login', controller.auth.login);
  router.post('/api/register', controller.auth.register);
  router.get('/api/userinfo', controller.auth.userinfo);
  router.get('/api/logout', controller.auth.logout);

  const webRouter = router.namespace('/api/web');
  const adminRouter = router.namespace('/api/admin');
  // user
  webRouter.post(`/users`, controller.web.user.create);
  webRouter.delete(`/users/:uuid`, controller.web.user.remove);
  webRouter.put(`/users/:uuid`, controller.web.user.update);
  webRouter.get(`/users/:uuid`, controller.web.user.detail) // b9226fc0-5229-11ea-bb9a-8da47b2f8935
  webRouter.get(`/users`, controller.web.user.list);

  // api
  webRouter.post(`/apis`, controller.web.api.create);
  webRouter.delete(`/apis/:uuid`, controller.web.api.remove);
  webRouter.put(`/apis/:uuid`, controller.web.api.update);
  webRouter.get(`/apis/:uuid`, controller.web.api.detail);
  webRouter.get(`/apis`, controller.web.api.list);

  // project
  webRouter.post(`/projects`, controller.web.project.create);
  webRouter.delete(`/projects/:uuid`, controller.web.project.remove);
  webRouter.put(`/projects/:uuid`, controller.web.project.update);
  webRouter.get(`/projects/:uuid`, controller.web.project.detail);
  webRouter.get(`/projects`, controller.web.project.list);

  // admin
  // user
  adminRouter.post(`/users`, controller.admin.user.create);
  adminRouter.delete(`/users/:uuid`, controller.admin.user.remove);
  adminRouter.put(`/users/:uuid`, controller.admin.user.update);
  adminRouter.get(`/users/:uuid`, controller.admin.user.detail) // b9226fc0-5229-11ea-bb9a-8da47b2f8935
  adminRouter.get(`/users`, controller.admin.user.list);

  // project
  adminRouter.post(`/projects`, controller.admin.project.create);
  adminRouter.delete(`/projects/:uuid`, controller.admin.project.remove);
  adminRouter.put(`/projects/:uuid`, controller.admin.project.update);
  adminRouter.get(`/projects/:uuid`, controller.admin.project.detail);
  adminRouter.get(`/projects`, controller.admin.project.list);
};
