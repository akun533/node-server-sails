/**
 * `tasks/register/build.js`
 *
 * ---------------------------------------------------------------
 *
 * 如果您在开发环境中运行 `sails www` 或 `grunt build`，
 * 此 Grunt 任务列表将被执行。
 *
 * 有关更多信息，请参见:
 *   https://sailsjs.com/anatomy/tasks/register/build.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('build', [
    // 'polyfill:dev', //« uncomment to ALSO transpile during development (for broader browser compat.)
    'compileAssets',
    // 'babel',        //« uncomment to ALSO transpile during development (for broader browser compat.)
    'linkAssetsBuild',
    'clean:build',
    'copy:build'
  ]);
};
