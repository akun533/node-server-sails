/**
 * 自定义配置
 * (sails.config.custom)
 *
 * 应用程序特定的一次性设置。
 *
 * 有关自定义配置的更多信息，请访问:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * 此 Sails 应用在开发过程中应使用的任何其他自定义配置。                     *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  // JWT 密钥配置（生产环境应使用环境变量 JWT_SECRET）
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',

};
