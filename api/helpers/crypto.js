/**
 * 密码加密解密工具
 * 与前端保持一致的加密算法
 */

// 密钥（16位）- 与前端保持一致
const SECRET_KEY = "PureAdmin@2024!!";

module.exports = {
  
  friendlyName: 'Crypto',
  
  description: '密码加密解密工具',
  
  inputs: {
    action: {
      type: 'string',
      required: true,
      isIn: ['encrypt', 'decrypt'],
      description: '操作类型：encrypt（加密）或 decrypt（解密）'
    },
    text: {
      type: 'string',
      required: true,
      description: '要加密或解密的文本'
    }
  },
  
  exits: {
    success: {
      description: '操作成功'
    },
    error: {
      description: '操作失败'
    }
  },
  
  fn: async function(inputs, exits) {
    const { action, text } = inputs;
    
    try {
      if (action === 'decrypt') {
        // 解密密码
        // Base64 解码
        const decoded = Buffer.from(text, 'base64').toString('binary');
        
        // XOR 解密
        let decrypted = '';
        for (let i = 0; i < decoded.length; i++) {
          decrypted += String.fromCharCode(
            decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
          );
        }
        
        // URL 解码
        const result = decodeURIComponent(decrypted);
        return exits.success(result);
        
      } else if (action === 'encrypt') {
        // 加密密码
        // URL 编码
        const encoded = encodeURIComponent(text);
        
        // XOR 加密
        let encrypted = '';
        for (let i = 0; i < encoded.length; i++) {
          encrypted += String.fromCharCode(
            encoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
          );
        }
        
        // Base64 编码
        const result = Buffer.from(encrypted, 'binary').toString('base64');
        return exits.success(result);
      }
    } catch (error) {
      sails.log.error('密码加密解密失败:', error);
      return exits.error(error);
    }
  }
  
};
