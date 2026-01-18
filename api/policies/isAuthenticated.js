/**
 * isAuthenticated Policy
 * 
 * @description :: 验证请求是否包含有效的 JWT token
 */

module.exports = async function (req, res, proceed) {

  // 从请求头获取 token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: '未提供认证令牌'
    });
  }

  // 解析 Bearer token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: '令牌格式错误'
    });
  }

  const token = parts[1];

  try {
    // 验证 token
    const decoded = await sails.helpers.jwt.with({
      action: 'verify',
      token: token
    });

    // 将解码后的用户信息附加到请求对象
    req.user = decoded;

    // 继续处理请求
    return proceed();

  } catch (error) {
    sails.log.warn('Token验证失败:', error.message);

    // 判断是否是 token 过期
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '令牌已过期',
        code: 'TOKEN_EXPIRED'
      });
    }

    // 其他 token 验证错误
    return res.status(401).json({
      success: false,
      message: '无效的令牌'
    });
  }

};
