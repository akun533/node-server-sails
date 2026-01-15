/**
 * `tasks/config/sails-linker`
 *
 * ---------------------------------------------------------------
 *
 * 自动将 <script> 标签和 <link> 标签注入到指定的
 * HTML 和/或 EJS 文件中。指定的分隔符 (`startTag`
 * 和 `endTag`) 确定插入点。
 *
 * 有关更多信息，请参见:
 *   https://sailsjs.com/anatomy/tasks/config/sails-linker.js
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sails-linker', {


    //   ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗
    //   ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║
    //  ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩
    //  ┌─    ┌─┐┬  ┬┌─┐┌┐┌┌┬┐  ┌─┐┬┌┬┐┌─┐   ┬┌─┐┬  ┬┌─┐┌─┐┌─┐┬─┐┬┌─┐┌┬┐    ─┐
    //  │───  │  │  │├┤ │││ │───└─┐│ ││├┤    │├─┤└┐┌┘├─┤└─┐│  ├┬┘│├─┘ │   ───│
    //  └─    └─┘┴─┘┴└─┘┘└┘ ┴   └─┘┴─┴┘└─┘  └┘┴ ┴ └┘ ┴ ┴└─┘└─┘┴└─┴┴   ┴     ─┘
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    devJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.js']
      }
    },

    prodJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/dist/*.js'],
        'views/**/*.html': ['.tmp/public/dist/*.js'],
        'views/**/*.ejs': ['.tmp/public/dist/*.js']
      }
    },


    //  ╔═╗╔╦╗╦ ╦╦  ╔═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗╔═╗
    //  ╚═╗ ║ ╚╦╝║  ║╣ ╚═╗╠═╣║╣ ║╣  ║ ╚═╗
    //  ╚═╝ ╩  ╩ ╩═╝╚═╝╚═╝╩ ╩╚═╝╚═╝ ╩ ╚═╝
    //  ┌─    ┬┌┐┌┌─┐┬  ┬ ┬┌┬┐┬┌┐┌┌─┐  ╔═╗╔═╗╔═╗   ┬   ┌─┐┌─┐┌┬┐┌─┐┬┬  ┌─┐┌┬┐  ╦  ╔═╗╔═╗╔═╗    ─┐
    //  │───  │││││  │  │ │ │││││││ ┬  ║  ╚═╗╚═╗  ┌┼─  │  │ ││││├─┘││  ├┤  ││  ║  ║╣ ╚═╗╚═╗  ───│
    //  └─    ┴┘└┘└─┘┴─┘└─┘─┴┘┴┘└┘└─┘  ╚═╝╚═╝╚═╝  └┘   └─┘└─┘┴ ┴┴  ┴┴─┘└─┘─┴┘  ╩═╝╚═╝╚═╝╚═╝    ─┘
    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    devStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.css']
      }
    },

    prodStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/dist/*.css'],
        'views/**/*.html': ['.tmp/public/dist/*.css'],
        'views/**/*.ejs': ['.tmp/public/dist/*.css']
      }
    },

  });//</ grunt.config.set() >

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
  //    $ npm install grunt-sails-linker --save-dev --save-exact
  //    ```
  //
  //
  // 2. 然后取消注释以下代码:
  //
  // ```
  // // 从 node_modules/ 文件夹加载 Grunt 插件。
  // grunt.loadNpmTasks('grunt-sails-linker');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
