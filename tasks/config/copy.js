/**
 * `tasks/config/copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/copy.js
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/public'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    },
    beforeLinkBuildProd: {
      files: [{
        expand: true,
        cwd: '.tmp/public/hash',
        src: ['**/*'],
        dest: '.tmp/public/dist'
      }]
    },
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 这个 Grunt 插件是 Sails 中默认资产管道的一部分，
  // 所以此时它已经为您自动加载了。
  //
  // 当然，您可以通过删除此文件来完全移除此 Grunt 插件。但是请注意：
  // 您也可以使用自己定制的此 Grunt 插件版本。
  //
  // 方法如下:
  //
  // 1. 将其作为 Sails 应用的本地依赖项安装:
  //    ```
  //    $ npm install grunt-contrib-copy --save-dev --save-exact
  //    ```
  //
  //
  // 2. 然后取消注释以下代码:
  //
  // ```
  // // 从 node_modules/ 文件夹加载 Grunt 插件。
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
