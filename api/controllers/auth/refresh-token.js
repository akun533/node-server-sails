/**
 * 刷新 Token
 * 
 * @description :: 使用 refreshToken 刷新 accessToken
 */

module.exports = {

  friendlyName: 'Refresh token',

  description: 'Refresh access token using refresh token',

  inputs: {
    refreshToken: {
      type: 'string',
      required: true,
      description: '刷新令牌'
    }
  },

  exits: {
    success: {
      description: 'Token refreshed successfully'
    }
  },

  fn: async function (inputs, exits) {

    try {
      // 验证 refreshToken
      const decoded = await sails.helpers.jwt.with({
        action: 'verify',
        token: inputs.refreshToken
      });

      // 检查是否是 refresh token
      if (decoded.type !== 'refresh') {
        return exits.success({
          success: false,
          message: '无效的刷新令牌'
        });
      }

      // 查找用户（确保用户仍然存在且有效）
      const user = await User.findOne({ 
        id: decoded.id 
      });

      if (!user) {
        return exits.success({
          success: false,
          message: '用户不存在'
        });
      }

      // 检查用户状态
      if (user.status === 0) {
        return exits.success({
          success: false,
          message: '账号已被禁用'
        });
      }

      // 生成新的 token
      const tokenPayload = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      // 生成新的 accessToken (24小时过期)
      const accessToken = await sails.helpers.jwt.with({
        action: 'sign',
        payload: tokenPayload,
        expiresIn: '24h'
      });

      // 生成新的 refreshToken (7天过期)
      const refreshToken = await sails.helpers.jwt.with({
        action: 'sign',
        payload: { ...tokenPayload, type: 'refresh' },
        expiresIn: '7d'
      });

      // 计算过期时间
      const expiresTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // 返回新的 token
      return exits.success({
        success: true,
        message: 'Token刷新成功',
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expires: expiresTime.toISOString()
        }
      });

    } catch (error) {
      sails.log.error('刷新Token失败:', error);
      
      // Token 过期或无效
      if (error.name === 'TokenExpiredError') {
        return exits.success({
          success: false,
          message: '刷新令牌已过期，请重新登录',
          code: 'REFRESH_TOKEN_EXPIRED'
        });
      }

      return exits.success({
        success: false,
        message: '刷新Token失败',
        error: error.message
      });
    }

  }

};
