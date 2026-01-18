/**
 * 删除用户
 * 
 * @description :: 删除用户
 */

module.exports = {

  friendlyName: 'Delete user',

  description: 'Delete a user',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: '用户ID'
    }
  },

  exits: {
    success: {
      description: 'User deleted successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 查找用户
      const user = await User.findOne({ id: inputs.id });

      if (!user) {
        return exits.success({
          success: false,
          message: '用户不存在或已被删除'
        });
      }

      // 禁止删除 admin 账号
      if (user.username === 'admin') {
        return exits.success({
          success: false,
          message: '禁止删除管理员账号'
        });
      }

      // 删除用户
      await User.destroyOne({ id: inputs.id });

      return exits.success({
        success: true,
        message: '用户删除成功'
      });

    } catch (error) {
      sails.log.error('删除用户失败:', error);
      return exits.success({
        success: false,
        message: '删除用户失败',
        error: error.message
      });
    }

  }

};
