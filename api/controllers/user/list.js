/**
 * 用户列表查询
 * 
 * @description :: 获取用户列表，支持分页和搜索
 */

module.exports = {

  friendlyName: 'List users',

  description: 'Get user list with pagination',

  inputs: {
    page: {
      type: 'number',
      defaultsTo: 1,
      description: '页码'
    },
    pageSize: {
      type: 'number',
      defaultsTo: 10,
      description: '每页数量'
    },
    username: {
      type: 'string',
      description: '用户名搜索'
    },
    email: {
      type: 'string',
      description: '邮箱搜索'
    },
    status: {
      type: 'number',
      description: '状态筛选'
    }
  },

  exits: {
    success: {
      description: 'Users retrieved successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      const { page, pageSize, username, email, status } = inputs;
      
      // 构建查询条件
      let whereClause = {};
      
      if (username) {
        whereClause.username = { contains: username };
      }
      
      if (email) {
        whereClause.email = { contains: email };
      }
      
      if (status !== undefined) {
        whereClause.status = status;
      }

      // 查询总数
      const total = await User.count(whereClause);

      // 分页查询
      const users = await User.find({
        where: whereClause,
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort: 'createdAt DESC'
      }).omit(['password']); // 不返回密码字段

      return exits.success({
        success: true,
        data: {
          list: users,
          total: total,
          page: page,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize)
        }
      });

    } catch (error) {
      sails.log.error('查询用户列表失败:', error);
      return exits.success({
        success: false,
        message: '查询用户列表失败',
        error: error.message
      });
    }

  }

};
