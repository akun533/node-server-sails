/**
 * 默认模型设置
 * (sails.config.models)
 *
 * 您的默认项目范围模型设置。也可以通过在模型定义中设置顶级属性
 * 在每个模型的基础上覆盖这些设置。
 *
 * 有关所有可用模型设置的详细信息，请参见:
 * https://sailsjs.com/config/models
 *
 * 有关 Sails 模型设置的一般背景知识，以及如何在项目范围
 * 或每个模型的基础上配置它们，请参见:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {


  /***************************************************************************
  *                                                                          *
  * 模型方法如 `.create()` 和 `.update()` 是否应该忽略(并拒绝持久化)未识别的  *
  * 数据-- 即除模型定义中明确指定的属性之外的其他属性。                      *
  *                                                                          *
  * 为了简化未来代码库的维护，通常最好将此项设置为 `true`。                  *
  *                                                                          *
  * > 注意，并非每个数据库都支持 `schema: false`。                          *
  * > 例如，如果您使用的是 SQL 数据库，那么相关模型总是实际上等于            *
  * > `schema: true`。如果没有提供任何 `schema` 设置，行为将取决于数据库适配器。*
  * >                                                                        *
  * > 有关更多信息，请参见:                                                  *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?schema           *
  *                                                                          *
  ***************************************************************************/

  // schema: true,


  /***************************************************************************
  *                                                                          *
  * Sails 如何以及是否尝试自动重建模式中的表/集合等。                         *
  *                                                                          *
  * > 请注意，当在生产环境中运行时，无论您在此处配置什么，这都将自动设置为   *
  * > `migrate: 'safe'`。这是为了防止 Sails 在您的生产数据库上意外运行自动迁移的 *
  * > 安全措施。                                                             *
  * >                                                                        *
  * > 有关更多信息，请参见:                                                  *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?migrate          *
  *                                                                          *
  ***************************************************************************/

  // migrate: 'alter',


  /***************************************************************************
  *                                                                          *
  * 默认包含在所有模型中的基本属性。按照惯例，这是您的主键属性 (`id`)，以及    *
  * 两个用于跟踪记录最后创建或更新时间的其他时间戳属性。                     *
  *                                                                          *
  * > 有关更多信息，请参见:                                                  *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?attributes       *
  *                                                                          *
  ***************************************************************************/

  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
    //--------------------------------------------------------------------------
    //  /\   Using MongoDB?
    //  ||   Replace `id` above with this instead:
    //
    // ```
    // id: { type: 'string', columnName: '_id' },
    // ```
    //
    // Plus, don't forget to configure MongoDB as your default datastore:
    // https://sailsjs.com/docs/tutorials/using-mongo-db
    //--------------------------------------------------------------------------
  },


  /******************************************************************************
  *                                                                             *
  * 静态加密的数据加密密钥 (DEKs) 集合。                                        *
  * 即用于具有 `encrypt: true` 属性的数据加密/解密。                            *
  *                                                                             *
  * > `default` DEK 用于所有新加密，但可以配置多个 DEK 以允许密钥轮换。在生产   *
  * > 环境中，请务必像管理任何其他敏感凭证一样管理这些密钥。                    *
  *                                                                             *
  * > 有关更多信息，请参见:                                                     *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
  *                                                                             *
  ******************************************************************************/

  dataEncryptionKeys: {
    default: 'rFO17WQw/0DPe4f7tb2WcDi2v41UtTNBAW2+gmoxS3k='
  },


  /***************************************************************************
  *                                                                          *
  * 关联的隐式记录是否应使用内置 polyfill 自动清理。这对于使用 sails-disk    *
  * 进行开发特别有用。                                                        *
  *                                                                          *
  * 根据您使用的数据库，您可能希望在生产环境中禁用此 polyfill。               *
  *                                                                          *
  * (有关生产配置，请参见 `config/env/production.js`.)                       *
  *                                                                          *
  ***************************************************************************/

  cascadeOnDestroy: true


};
