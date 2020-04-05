'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const client_api_prefix = '/api/client';
const admin_api_prefix = '/api/admin';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // user
  router.post(`${client_api_prefix}/users`, controller.client.user.create);
  router.delete(`${client_api_prefix}/users/:uuid`, controller.client.user.remove);
  router.put(`${client_api_prefix}/users/:uuid`, controller.client.user.update);
  router.get(`${client_api_prefix}/users/:uuid`, controller.client.user.detail) // b9226fc0-5229-11ea-bb9a-8da47b2f8935
  router.get(`${client_api_prefix}/users`, controller.client.user.list);

  // api
  router.post(`${client_api_prefix}/apis`, controller.client.api.create);
  router.delete(`${client_api_prefix}/apis/:uuid`, controller.client.api.remove);
  router.put(`${client_api_prefix}/apis/:uuid`, controller.client.api.update);
  router.get(`${client_api_prefix}/apis/:uuid`, controller.client.api.detail);
  router.get(`${client_api_prefix}/apis`, controller.client.api.list);

  // project
  router.post(`${client_api_prefix}/projects`, controller.client.project.create);
  router.delete(`${client_api_prefix}/projects/:uuid`, controller.client.project.remove);
  router.put(`${client_api_prefix}/projects/:uuid`, controller.client.project.update);
  router.get(`${client_api_prefix}/projects/:uuid`, controller.client.project.detail);
  router.get(`${client_api_prefix}/projects`, controller.client.project.list);
};
