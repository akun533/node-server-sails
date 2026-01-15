/**
 * HTTP 服务器设置
 * (sails.config.http)
 *
 * Sails 中底层 HTTP 服务器的配置。
 * (有关其他推荐设置，请参见 `config/env/production.js`)
 *
 * 有关配置的更多信息，请查看:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * 每个 HTTP 请求要运行的 Sails/Express 中间件。                              *
  * (仅适用于 HTTP 请求 -- 不适用于虚拟 WebSocket 请求。)                     *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * 中间件应该按什么顺序运行以处理 HTTP 请求。                               *
    * (此 Sails 应用的路由由下面的 "router" 中间件处理。)                      *
    *                                                                          *
    ***************************************************************************/

    // order: [
    //   'cookieParser',
    //   'session',
    //   'bodyParser',
    //   'compress',
    //   'poweredBy',
    //   'router',
    //   'www',
    //   'favicon',
    // ],


    /***************************************************************************
    *                                                                          *
    * 处理传入的多部分 HTTP 请求的正文解析器。                                  *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
