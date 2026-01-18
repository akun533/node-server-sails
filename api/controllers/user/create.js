/**
 * 创建用户
 * 
 * @description :: 创建新用户
 */

module.exports = {

  friendlyName: 'Create user',

  description: 'Create a new user',

  inputs: {
    username: {
      type: 'string',
      required: true,
      description: '用户名'
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      description: '邮箱'
    },
    password: {
      type: 'string',
      required: true,
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
      description: 'User created successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 解密前端传来的密码
      const decryptedPassword = await sails.helpers.crypto.with({ action: 'decrypt', text: inputs.password });
      
      // 重新加密密码，存储到数据库
      const encryptedPassword = await sails.helpers.crypto.with({ action: 'encrypt', text: decryptedPassword });
      
      // 创建用户
      const newUser = await User.create({
        username: inputs.username,
        email: inputs.email,
        password: encryptedPassword, // 存储加密后的密码
        realName: inputs.realName,
        phone: inputs.phone,
        gender: inputs.gender || 0,
        role: inputs.role || 'tenant',
        avatar: inputs.avatar,
        status: inputs.status !== undefined ? inputs.status : 1,
        remark: inputs.remark
      }).fetch();

      // 移除密码字段
      delete newUser.password;

      return exits.success({
        success: true,
        message: '用户创建成功',
        data: newUser
      });

    } catch (error) {
      sails.log.error('创建用户失败:', error);
      
      // 处理唯一约束错误
      if (error.code === 'E_UNIQUE') {
        return exits.success({
          success: false,
          message: '用户名或邮箱已存在'
        });
      }

      return exits.success({
        success: false,
        message: '创建用户失败',
        error: error.message
      });
    }

  }

};
