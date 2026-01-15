/**
 * 安全设置
 * (sails.config.security)
 *
 * 这些设置影响您应用程序安全性的各个方面，比如它如何处理
 * 跨域请求 (CORS) 以及哪些路由需要在请求中包含 CSRF 令牌。
 *
 * 有关 Sails 如何处理安全性的概述，请参见:
 * https://sailsjs.com/documentation/concepts/security
 *
 * 有关其他选项和更多信息，请参见:
 * https://sailsjs.com/config/security
 */

module.exports.security = {

  /***************************************************************************
  *                                                                          *
  * CORS 就像是更现代版本的 JSONP-- 它允许您的应用程序绕过浏览器的同源策略，     *
  * 因此托管在一个域上的 Sails 应用的响应 (例如 example.com) 可以被接收      *
  * 在您信任的托管在_其他_域 (例如 trustedsite.net) 上的页面的客户端 JavaScript*
  * 代码中。                                                                *
  *                                                                          *
  * 有关其他选项和更多信息，请参见:                                          *
  * https://sailsjs.com/docs/concepts/security/cors                          *
  *                                                                          *
  ***************************************************************************/

  // cors: {
  //   allRoutes: false,
  //   allowOrigins: '*',
  //   allowCredentials: false,
  // },


  /****************************************************************************
  *                                                                           *
  * 默认情况下，为了便于快速开发，Sails 内置的 CSRF 保护是禁用的。但请注意！   *
  * 如果您的 Sails 应用将被 Web 浏览器访问，在部署到生产环境之前，您应该_始终_*
  * 启用 CSRF 保护。                                                          *
  *                                                                           *
  * 要启用 CSRF 保护，将此项设置为 `true`。                                   *
  *                                                                           *
  * 有关更多信息，请参见:                                                     *
  * https://sailsjs.com/docs/concepts/security/csrf                           *
  *                                                                           *
  ****************************************************************************/

  // csrf: false

};
