/**
 * 种子函数
 * (sails.config.bootstrap)
 *
 * 一个在您的 Sails 应用启动前立即运行的函数。
 * > 需要更多灵活性吗？ 您也可以创建一个钩子。
 *
 * 有关使用假数据填充您的应用的更多信息，请查看:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // 按照约定，这是在开发过程中设置假数据的好地方。
  //
  // 例如:
  // ```
  // // 设置假开发数据 (或者如果我们已经有一些数据，则保持现状)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // 等等.
  // ]);
  // ```

};
