/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  // 登录和刷新token不需要认证
  'auth/login': true,
  'auth/refresh-token': true,

  // 数据库测试接口不需要认证（仅供测试使用）
  'database/test-connection': true,

  // 用户管理相关接口需要认证
  'user/*': 'isAuthenticated'

};
