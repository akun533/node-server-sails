/**
 * 数据库连接测试控制器
 * 
 * @description :: 测试数据库连接是否成功
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: '测试数据库连接',

  description: '测试与数据库的连接是否正常',

  exits: {
    success: {
      description: 'Database connection successful',
    },
    serverError: {
      description: 'Database connection failed',
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 获取数据存储管理器
      const datastore = sails.getDatastore();
      
      // 尝试执行一个简单的查询来测试连接
      await datastore.sendNativeQuery('SELECT 1 as test');
      
      // 获取数据库配置信息（隐藏敏感信息）
      const config = datastore.config;
      const connectionInfo = {
        adapter: config.adapter,
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
      };

      // 返回成功响应
      return exits.success({
        success: true,
        message: '数据库连接成功！',
        timestamp: new Date().toISOString(),
        connection: connectionInfo
      });

    } catch (error) {
      // 记录错误日志
      sails.log.error('数据库连接测试失败:', error);

      // 返回错误响应
      return exits.serverError({
        success: false,
        message: '数据库连接失败',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }

  }

};
