/**
 * 用户登录
 *
 * @description :: 用户登录验证
 */

module.exports = {

  friendlyName: 'User login',

  description: 'User login authentication',

  inputs: {
    username: {
      type: 'string',
      required: true,
      description: '用户名'
    },
    password: {
      type: 'string',
      required: true,
      description: '密码（加密）'
    }
  },

  exits: {
    success: {
      description: 'Login successful'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // 解密密码
      const decryptedPassword = await sails.helpers.crypto.with({ action: 'decrypt', text: inputs.password });

      // 查找用户
      const user = await User.findOne({
        username: inputs.username
      });

      if (!user) {
        return exits.success({
          success: false,
          message: '用户名或密码错误'
        });
      }

      // 检查用户状态
      if (user.status === 0) {
        return exits.success({
          success: false,
          message: '账号已被禁用，请联系管理员'
        });
      }

      // 验证密码（这里假设数据库存储的是加密后的密码）
      // 需要先加密输入的密码，再与数据库中的密码比较
      const encryptedInputPassword = await sails.helpers.crypto.with({ action: 'encrypt', text: decryptedPassword });

      if (user.password !== encryptedInputPassword) {
        return exits.success({
          success: false,
          message: '用户名或密码错误'
        });
      }

      // 更新最后登录时间和IP
      await User.updateOne({ id: user.id }).set({
        lastLoginAt: Date.now(),
        lastLoginIp: this.req.ip
      });

      // 移除密码字段
      delete user.password;

      // 生成 JWT token
      const tokenPayload = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      // 生成 accessToken (24小时过期)
      const accessToken = await sails.helpers.jwt.with({
        action: 'sign',
        payload: tokenPayload,
        expiresIn: '24h'
      });

      // 生成 refreshToken (7天过期)
      const refreshToken = await sails.helpers.jwt.with({
        action: 'sign',
        payload: { ...tokenPayload, type: 'refresh' },
        expiresIn: '7d'
      });

      // 计算过期时间
      const expiresTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // 返回成功，包含用户信息和token
      return exits.success({
        success: true,
        message: '登录成功',
        data: {
          avatar: user.avatar || '',
          username: user.username,
          nickname: user.realName || user.username,
          roles: [user.role],
          permissions: user.role === 'admin' ? ['*:*:*'] : ['user:*:*'],
          accessToken: accessToken,
          refreshToken: refreshToken,
          expires: expiresTime.toISOString()
        }
      });

    } catch (error) {
      sails.log.error('登录失败:', error);
      return exits.success({
        success: false,
        message: '登录失败，请稍后重试',
        error: error.message
      });
    }

  }

};
