/**
 * 路由映射
 * (sails.config.routes)
 *
 * 您的路由告诉 Sails 每次收到请求时应该做什么。
 *
 * 有关配置自定义路由的更多信息，请查看:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * 将位于 `views/homepage.ejs` 的视图设为您的主页。                          *
  *                                                                          *
  * (或者，删除此项并在您的 `assets` 目录中添加一个 `index.html` 文件)       *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // 用户认证接口
  'POST /login': 'auth/login',
  'POST /refresh-token': 'auth/refresh-token',


  /***************************************************************************
  *                                                                          *
  * 更多自定义路由在这里...                                                  *
  * (示例请参见 https://sailsjs.com/config/routes)                           *
  *                                                                          *
  * 如果对 URL 的请求与此文件中的任何路由都不匹配，则会与                   *
  * "影子路由" (例如蓝图路由) 匹配。如果仍然不匹配其中任何一个，              *
  * 则会与静态资源匹配。                                                     *
  *                                                                          *
  ***************************************************************************/

  // 数据库连接测试接口
  'GET /api/database/test': 'database/test-connection',

  // 用户管理接口
  'GET /api/users': 'user/list',
  'GET /api/users/:id': 'user/detail',
  'POST /api/users': 'user/create',
  'PUT /api/users/:id': 'user/update',
  'DELETE /api/users/:id': 'user/delete',


};
