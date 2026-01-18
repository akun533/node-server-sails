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
      // 删除用户
      const deletedUser = await User.destroyOne({ id: inputs.id });

      if (!deletedUser) {
        return exits.success({
          success: false,
          message: '用户不存在或已被删除'
        });
      }

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
