/**
 * 数据存储
 * (sails.config.datastores)
 *
 * 一组数据存储配置，告诉 Sails 在执行内置模型方法如 `.find()` 和 `.create()` 时
 * 从何处获取或保存数据。
 *
 *  > 此文件主要用于配置您的开发数据库，
 *  > 以及由各个模型使用的任何其他一次性数据库。
 *  > 准备上线？请查看 `config/env/production.js`。
 *
 * 有关配置数据存储的更多信息，请查看:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * 您的应用程序的默认数据存储。                                              *
  *                                                                          *
  * 使用 PostgreSQL 数据库                                                   *
  * 配置信息从 .env 文件中读取                                                *
  *                                                                          *
  ***************************************************************************/

  default: {

    /***************************************************************************
    *                                                                          *
    * PostgreSQL 数据库配置                                                    *
    *                                                                          *
    * 使用 sails-postgresql 适配器连接 PostgreSQL 数据库                       *
    * 连接参数从环境变量中读取                                                  *
    *                                                                          *
    ***************************************************************************/
    adapter: 'sails-postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sails',

  },


};
