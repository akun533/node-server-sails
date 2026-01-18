/**
 * 获取用户详情
 * 
 * @description :: 根据ID获取用户详细信息
 */

module.exports = {

  friendlyName: 'Get user detail',

  description: 'Get user detail by ID',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: '用户ID'
    }
  },

  exits: {
    success: {
      description: 'User detail retrieved successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 查询用户
      const user = await User.findOne({ id: inputs.id })
        .omit(['password']);

      if (!user) {
        return exits.success({
          success: false,
          message: '用户不存在'
        });
      }

      return exits.success({
        success: true,
        data: user
      });

    } catch (error) {
      sails.log.error('查询用户详情失败:', error);
      return exits.success({
        success: false,
        message: '查询用户详情失败',
        error: error.message
      });
    }

  }

};
