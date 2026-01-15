/**
 * 生产环境设置
 * (sails.config.*)
 *
 * 下面是您需要为生产环境配置 Sails 应用程序而内置设置的快速概述。
 * 此文件中的配置仅在您的生产环境中使用，即当您使用以下命令启动应用程序时：
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > 如果您使用 git 作为 Sails 应用程序的版本控制解决方案，
 * > 此文件默认会被提交到您的仓库，除非您将其添加到 .gitignore 文件中。
 * > 如果您的仓库是公开可见的，请勿在此文件中添加私有/敏感数据（如 API 密钥/数据库密码）！
 *
 * 有关更多最佳实践和提示，请参阅：
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {


  /**************************************************************************
  *                                                                         *
  * Tell Sails what database(s) it should use in production.                *
  *                                                                         *
  * (https://sailsjs.com/config/datastores)                                 *
  *                                                                         *
  **************************************************************************/
  datastores: {

    /***************************************************************************
    *                                                                          *
    * Configure your default production database.                              *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
    *    and any other, adapter-specific customizations.                       *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    default: {
      // adapter: 'sails-mysql',
      // url: 'mysql://user:password@host:port/database',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      //
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------

      /****************************************************************************
      *                                                                           *
      * More adapter-specific options                                             *
      *                                                                           *
      * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
      * > extra `ssl` object with a `rejectUnauthorized` option must be provided. *
      *                                                                           *
      * More info:                                                                *
      * https://sailsjs.com/config/datastores                                     *
      *                                                                           *
      ****************************************************************************/
      // ssl: { rejectUnauthorized: true },

    },

  },



  models: {

    /***************************************************************************
    *                                                                          *
    * 为了避免意外，当您的应用程序在生产模式下启动时，Sails 会自动将自动迁移          *
    * 策略设置为 "safe"。                                                      *
    * （这只是作为一个提醒。）                                                   *
    *                                                                          *
    * 更多信息:                                                                 *
    * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
    *                                                                          *
    ***************************************************************************/
    migrate: 'safe',

    /***************************************************************************
    *                                                                          *
    * 如果在生产环境中，此应用程序可以访问物理层的 CASCADE 约束条件              *
    * （例如 PostgreSQL 或 MySQL），则在数据库中设置这些约束条件并取消注释      *
    * 此处以禁用 Waterline 的 `cascadeOnDestroy` polyfill。                     *
    * （否则，如果您使用像 Mongo 这样的数据库，您可能希望保持启用。）            *
    *                                                                          *
    ***************************************************************************/
    // cascadeOnDestroy: false,

  },



  /**************************************************************************
  *                                                                         *
  * Always disable "shortcut" blueprint routes.                             *
  *                                                                         *
  * > You'll also want to disable any other blueprint routes if you are not *
  * > actually using them (e.g. "actions" and "rest") -- but you can do     *
  * > that in `config/blueprints.js`, since you'll want to disable them in  *
  * > all environments (not just in production.)                            *
  *                                                                         *
  ***************************************************************************/
  blueprints: {
    shortcuts: false,
  },



  /***************************************************************************
  *                                                                          *
  * Configure your security settings for production.                         *
  *                                                                          *
  * IMPORTANT:                                                               *
  * If web browsers will be communicating with your app, be sure that        *
  * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
  * in the `config/security.js` file (not here), so that CSRF app can be     *
  * tested with CSRF protection turned on in development mode too.           *
  *                                                                          *
  ***************************************************************************/
  security: {

    /***************************************************************************
    *                                                                          *
    * If this app has CORS enabled (see `config/security.js`) with the         *
    * `allowCredentials` setting enabled, then you should uncomment the        *
    * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
    * to send cross-domain (CORS) requests to your Sails app.                  *
    *                                                                          *
    * > Replace "https://example.com" with the URL of your production server.  *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },



  /***************************************************************************
  *                                                                          *
  * 配置您的应用程序在生产环境中如何处理会话。                                 *
  *                                                                          *
  * (https://sailsjs.com/config/session)                                     *
  *                                                                          *
  * > 如果您已禁用 "session" 钩子，则可以从 `config/env/production.js` 文件中 *
  * > 安全地移除这部分内容。                                                  *
  *                                                                          *
  ***************************************************************************/
  session: {

    /***************************************************************************
    *                                                                          *
    * 生产环境会话存储配置。                                                    *
    *                                                                          *
    * 取消注释以下行以完成设置一个名为 "@sailshq/connect-redis" 的包，该包将     *
    * 使用 Redis 来处理会话数据。这使得您的应用程序更具可扩展性，允许您在多个      *
    * Sails/Node.js 服务器和/或进程组成的集群之间共享会话。                    *
    * （有关更多信息，请参见 http://bit.ly/redis-session-config。）             *
    *                                                                          *
    * > 虽然 @sailshq/connect-redis 是 Sails 应用程序的热门选择，但许多其他兼容    *
    * > 包（如 "connect-mongo"）可在 NPM 上获得。                            *
    * > （完整列表，请参见 https://sailsjs.com/plugins/sessions）               *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_session__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //
    //--------------------------------------------------------------------------

    /***************************************************************************
    *                                                                          *
    * 会话 ID Cookie 名称的生产环境配置。                                       *
    *                                                                          *
    * 我们建议为您的会话 Cookie 添加 `__Host-` 前缀，这会将 Cookie 的作用域限制   *
    * 为单一来源，以防止同站攻击。                                              *
    *                                                                          *
    * 注意，使用 `__Host-` 前缀时，会话 Cookie 将不会被发送，除非                    *
    * `sails.config.cookie.secure` 设置为 `true`。                             *
    *                                                                          *
    * 阅读更多:                                                                *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    // name: '__Host-sails.sid',

    /***************************************************************************
    *                                                                          *
    * 会话 ID Cookie 的生产环境配置。                                           *
    *                                                                          *
    * 告诉浏览器（或其他用户代理）确保会话 ID Cookie 始终通过 HTTPS 传输，并且在    *
    * 设置后 24 小时过期。                                                     *
    *                                                                          *
    * 请注意，设置 `secure: true` 后，会话 Cookie 将不会通过不安全的（HTTP）       *
    * 连接传输。此外，对于位于代理后面的应用程序（如 Heroku），必须配置 `http`     *
    * 下的 `trustProxy` 设置才能使 `secure: true` 生效。                        *
    *                                                                          *
    * > 虽然您可能想要增加或减少 `maxAge` 或提供其他选项，但如果应用程序通过 HTTPS  *
    * > 提供服务，在生产环境中您应始终设置 `secure: true`。                     *
    *                                                                          *
    * 阅读更多:                                                                *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },



  /**************************************************************************
  *                                                                          *
  * Set up Socket.io for your production environment.                        *
  *                                                                          *
  * (https://sailsjs.com/config/sockets)                                     *
  *                                                                          *
  * > If you have disabled the "sockets" hook, then you can safely remove    *
  * > this section from your `config/env/production.js` file.                *
  *                                                                          *
  ***************************************************************************/
  sockets: {

    /***************************************************************************
    *                                                                          *
    * Uncomment the `onlyAllowOrigins` whitelist below to configure which      *
    * "origins" are allowed to open socket connections to your Sails app.      *
    *                                                                          *
    * > Replace "https://example.com" etc. with the URL(s) of your app.        *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    // onlyAllowOrigins: [
    //   'https://example.com',
    //   'https://staging.example.com',
    // ],


    /***************************************************************************
    *                                                                          *
    * If you are deploying a cluster of multiple servers and/or processes,     *
    * then uncomment the following lines.  This tells Socket.io about a Redis  *
    * server it can use to help it deliver broadcasted socket messages.        *
    *                                                                          *
    * > Be sure a compatible version of @sailshq/socket.io-redis is installed! *
    * > (See https://sailsjs.com/config/sockets for the latest version info)   *
    *                                                                          *
    * (https://sailsjs.com/docs/concepts/deployment/scaling)                   *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_sockets__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //--------------------------------------------------------------------------

  },



  /**************************************************************************
  *                                                                         *
  * 设置生产环境日志级别。                                                    *
  *                                                                         *
  * (https://sailsjs.com/config/log)                                        *
  *                                                                         *
  ***************************************************************************/
  log: {
    level: 'debug'
  },



  http: {

    /***************************************************************************
    *                                                                          *
    * 在生产环境中缓存静态资源的毫秒数。                                        *
    * （“Cache-Control”响应头中包含的“max-age”）                                *
    *                                                                          *
    * 如果您使用像 Cloudflare 这样的工具来缓存资源，您可能需要大幅减少此值，以   *
    * 允许在清除缓存方面有更大的灵活性。                                         *
    *                                                                          *
    ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
    *                                                                          *
    * 代理设置                                                                 *
    *                                                                          *
    * 如果您的应用程序将部署在代理/负载均衡器后面 - 例如，在像 Heroku 这样的      *
    * PaaS 上 - 那么请取消注释下面的 `trustProxy` 设置。这会告诉 Sails/Express   *
    * 如何解释 X-Forwarded 头部。                                              *
    *                                                                          *
    * 如果您使用安全 Cookie（参见上面 `session` 下的 `cookies: secure` 设置）   *
    * 或者您的应用程序依赖于知道请求来自的原始 IP 地址，则此设置尤其重要。         *
    *                                                                          *
    * (https://sailsjs.com/config/http)                                        *
    *                                                                          *
    ***************************************************************************/
    // trustProxy: true,

  },



  /**************************************************************************
  *                                                                         *
  * 在端口 80 上启动服务器。                                                 *
  * （如果部署在代理后面，或者部署到像 Heroku 或 Deis 这样的 PaaS，您可能    *
  * 不需要在这里设置端口，因为它通常会自动为您处理。如果您不确定是否需要设置    *
  * 这个端口，只需尝试在不设置的情况下部署，看看是否有效。）                   *
  *                                                                         *
  ***************************************************************************/
  // port: 80,



  /**************************************************************************
  *                                                                         *
  * 配置 SSL 证书                                                           *
  *                                                                         *
  * 为了您用户数据的安全，您应该在生产环境中使用 SSL。                       *
  * ...但在许多情况下，您实际上可能不想在这里设置它。                       *
  *                                                                         *
  * 通常，此设置仅在运行单进程部署且没有代理/负载均衡器的情况下才相关。       *
  * 但另一方面，如果您使用像 Heroku 这样的 PaaS，您会想在您的负载均衡器设置   *
  * 中设置 SSL（通常在您的托管提供商的仪表板中的某个地方——而不是在这里）。     *
  *                                                                         *
  * > 有关在 Sails 中配置 SSL 的更多信息，请参阅：                          *
  * > https://sailsjs.com/config/*#?sailsconfigssl                          *
  *                                                                         *
  **************************************************************************/
  // ssl: undefined,



  /**************************************************************************
  *                                                                         *
  * 针对您的应用程序特定的任何自定义设置的生产环境覆盖。                      *
  * （例如，用于像 Stripe 这样的第三方 API 的生产环境凭据）                   *
  *                                                                         *
  * > 有关如何配置这些选项的更多信息，请参阅 config/custom.js。             *
  *                                                                         *
  ***************************************************************************/
  custom: {
    baseUrl: 'https://example.com',
    internalEmailAddress: 'support@example.com',

    // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sendgridSecret=SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

  },



};
