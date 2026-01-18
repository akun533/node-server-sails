/**
 * 种子函数
 * (sails.config.bootstrap)
 *
 * 一个在您的 Sails 应用启动时立即运行的函数。
 * > 需要更多灵活性吗？ 您也可以创建一个钩子。
 *
 * 有关使用假数据填充您的应用的更多信息，请查看:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // 检查用户表是否为空，如果为空则创建默认管理员账号
  try {
    sails.log.info('===== 开始执行 Bootstrap =====');
    
    // 检查数据库连接
    sails.log.info('正在检查数据库连接...');
    const userCount = await User.count();
    sails.log.info(`数据库连接成功，当前用户数量: ${userCount}`);
    
    if (userCount === 0) {
      sails.log.info('用户表为空，正在创建默认管理员账号...');
      
      // 使用加密工具加密密码
      sails.log.info('正在加密密码...');
      const encryptedPassword = await sails.helpers.crypto.with({ action: 'encrypt', text: 'admin123' });
      sails.log.info('密码加密成功');
      
      // 创建默认管理员
      sails.log.info('正在创建管理员用户...');
      const adminUser = await User.create({
        username: 'admin',
        email: `admin_${Date.now()}@system.com`,
        password: encryptedPassword,
        realName: '系统管理员',
        role: 'admin',
        status: 1
      }).fetch();
      
      sails.log.info('===== 默认管理员账号创建成功！ =====');
      sails.log.info('用户名: admin');
      sails.log.info('密码: admin123');
      sails.log.info('用户ID:', adminUser.id);
    } else {
      sails.log.info(`用户表已有 ${userCount} 个用户，跳过默认管理员创建`);
    }
    
    sails.log.info('===== Bootstrap 执行完成 =====');
  } catch (error) {
    sails.log.error('===== Bootstrap 执行失败 =====');
    sails.log.error('错误详情:', error);
    sails.log.error('错误堆栈:', error.stack);
  }

};
