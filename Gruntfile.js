/**
 * Gruntfile
 *
 * 当你运行 `grunt` 时以及当你运行
 * `sails lift` (前提是已安装且未禁用 grunt 钩子) 时，
 * 此 Node 脚本将被执行。
 *
 * 警告:
 * 除非你知道自己在做什么，否则不应更改此文件。
 * 请查看 `tasks/` 目录。
 *
 * 更多信息请参见:
 *   https://sailsjs.com/anatomy/Gruntfile.js
 */
module.exports = function(grunt) {

  var loadGruntTasks = require('sails-hook-grunt/accessible/load-grunt-tasks');

  // 加载 Grunt 任务配置 (来自 `tasks/config/`) 和 Grunt
  // 任务注册 (来自 `tasks/register/`).
  loadGruntTasks(__dirname, grunt);

};
