/**
 * 更新用户
 * 
 * @description :: 更新用户信息
 */

module.exports = {

  friendlyName: 'Update user',

  description: 'Update user information',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: '用户ID'
    },
    username: {
      type: 'string',
      description: '用户名'
    },
    email: {
      type: 'string',
      isEmail: true,
      description: '邮箱'
    },
    password: {
      type: 'string',
      minLength: 6,
      description: '密码'
    },
    realName: {
      type: 'string',
      description: '真实姓名'
    },
    phone: {
      type: 'string',
      description: '手机号'
    },
    gender: {
      type: 'number',
      description: '性别'
    },
    role: {
      type: 'string',
      isIn: ['admin', 'tenant'],
      description: '角色 (admin/tenant)'
    },
    avatar: {
      type: 'string',
      description: '头像Base64编码'
    },
    status: {
      type: 'number',
      description: '状态'
    },
    remark: {
      type: 'string',
      description: '备注'
    }
  },

  exits: {
    success: {
      description: 'User updated successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 检查用户是否存在
      const existingUser = await User.findOne({ id: inputs.id });
      if (!existingUser) {
        return exits.success({
          success: false,
          message: '用户不存在'
        });
      }

      // 构建更新数据
      const updateData = {};
      if (inputs.username) updateData.username = inputs.username;
      if (inputs.email) updateData.email = inputs.email;
      if (inputs.password) {
        // 解密密码
        updateData.password = await sails.helpers.crypto.with({ action: 'decrypt', text: inputs.password });
      }
      if (inputs.realName !== undefined) updateData.realName = inputs.realName;
      if (inputs.phone !== undefined) updateData.phone = inputs.phone;
      if (inputs.gender !== undefined) updateData.gender = inputs.gender;
      if (inputs.role !== undefined) updateData.role = inputs.role;
      if (inputs.avatar !== undefined) updateData.avatar = inputs.avatar;
      if (inputs.status !== undefined) updateData.status = inputs.status;
      if (inputs.remark !== undefined) updateData.remark = inputs.remark;

      // 更新用户
      const updatedUser = await User.updateOne({ id: inputs.id })
        .set(updateData);

      if (!updatedUser) {
        return exits.success({
          success: false,
          message: '更新用户失败'
        });
      }

      // 移除密码字段
      delete updatedUser.password;

      return exits.success({
        success: true,
        message: '用户更新成功',
        data: updatedUser
      });

    } catch (error) {
      sails.log.error('更新用户失败:', error);
      
      if (error.code === 'E_UNIQUE') {
        return exits.success({
          success: false,
          message: '用户名或邮箱已存在'
        });
      }

      return exits.success({
        success: false,
        message: '更新用户失败',
        error: error.message
      });
    }

  }

};
