/**
 * `tasks/register/prod.js`
 *
 * ---------------------------------------------------------------
 *
 * 当您的 Sails 应用在生产环境中启动时 (例如使用
 * `NODE_ENV=production node app`)，此 Grunt 任务列表将代替 `default` 执行。
 *
 * 有关更多信息，请参见:
 *   https://sailsjs.com/anatomy/tasks/register/prod.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('prod', [
    'polyfill:prod', //« Remove this to skip transpilation in production (not recommended)
    'compileAssets',
    'babel',         //« Remove this to skip transpilation in production (not recommended)
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
  ]);
};

