/**
 * JWT Token Helper
 * 
 * @description :: 用于生成和验证 JWT Token
 */

const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'JWT Helper',

  description: 'Generate and verify JWT tokens',

  inputs: {
    action: {
      type: 'string',
      required: true,
      isIn: ['sign', 'verify'],
      description: '操作类型: sign-生成token, verify-验证token'
    },
    payload: {
      type: 'json',
      description: 'token payload 数据（sign时使用）'
    },
    token: {
      type: 'string',
      description: '要验证的token（verify时使用）'
    },
    expiresIn: {
      type: 'string',
      defaultsTo: '24h',
      description: 'token过期时间，默认24小时'
    }
  },

  exits: {
    success: {
      description: 'Operation successful'
    },
    error: {
      description: 'Operation failed'
    }
  },

  fn: async function (inputs, exits) {
    // JWT 密钥，从配置文件读取
    const JWT_SECRET = sails.config.custom.jwtSecret || process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    try {
      if (inputs.action === 'sign') {
        // 生成 token
        if (!inputs.payload) {
          throw new Error('Payload is required for signing token');
        }

        const token = jwt.sign(
          inputs.payload,
          JWT_SECRET,
          { expiresIn: inputs.expiresIn }
        );

        return exits.success(token);

      } else if (inputs.action === 'verify') {
        // 验证 token
        if (!inputs.token) {
          throw new Error('Token is required for verification');
        }

        const decoded = jwt.verify(inputs.token, JWT_SECRET);
        return exits.success(decoded);
      }

    } catch (error) {
      sails.log.error('JWT Helper Error:', error.message);
      return exits.error({
        message: error.message,
        name: error.name
      });
    }
  }

};
