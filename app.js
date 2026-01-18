/**
 * app.js
 *
 * 使用 `app.js` 来运行您的应用而无需使用 `sails lift`。
 * 要启动服务器，请运行: `node app.js`。
 *
 * 在某些情况下这非常方便，比如当 sails CLI 不相关或无用时，
 * 例如当您部署到服务器或像 Heroku 这样的 PaaS 平台时。
 *
 * 例如:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * 支持相同的命令行参数和环境变量，例如:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * 更多信息请参见:
 *   https://sailsjs.com/anatomy/app.js
 */

// 加载环境变量
require('dotenv').config();

// 确保我们在项目目录中,这样无论我们实际从哪里启动,cwd-相对路径都会按预期工作。
// > 注意: 启动时不需要此操作，但这是一种便捷的默认设置。
process.chdir(__dirname);



// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•


// 启动服务器
sails.lift(rc('sails'));
