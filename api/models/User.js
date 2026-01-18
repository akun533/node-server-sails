/**
 * User.js
 *
 * 用户模型定义
 * @description :: 用户数据模型，用于存储用户信息
 */

module.exports = {

  tableName: 'users',

  attributes: {

    // 用户名
    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      columnType: 'varchar(50)',
      description: '用户名，唯一标识'
    },

    // 邮箱
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 100,
      columnType: 'varchar(100)',
      description: '用户邮箱'
    },

    // 密码（加密存储）
    password: {
      type: 'string',
      required: true,
      columnType: 'varchar(255)',
      description: '用户密码（加密）'
    },

    // 真实姓名
    realName: {
      type: 'string',
      allowNull: true,
      maxLength: 50,
      columnName: 'real_name',
      columnType: 'varchar(50)',
      description: '真实姓名'
    },

    // 手机号
    phone: {
      type: 'string',
      allowNull: true,
      maxLength: 20,
      columnType: 'varchar(20)',
      description: '手机号码'
    },

    // 性别 (0:未知, 1:男, 2:女)
    gender: {
      type: 'number',
      defaultsTo: 0,
      columnType: 'integer',
      description: '性别 (0:未知, 1:男, 2:女)'
    },

    // 角色 (admin:管理员, tenant:租户)
    role: {
      type: 'string',
      defaultsTo: 'tenant',
      isIn: ['admin', 'tenant'],
      columnType: 'varchar(20)',
      description: '用户角色 (admin:管理员, tenant:租户)'
    },

    // 头像（Base64编码）
    avatar: {
      type: 'string',
      allowNull: true,
      columnType: 'text',
      description: '头像Base64编码'
    },

    // 状态 (0:禁用, 1:正常)
    status: {
      type: 'number',
      defaultsTo: 1,
      columnType: 'integer',
      description: '用户状态 (0:禁用, 1:正常)'
    },

    // 最后登录时间
    lastLoginAt: {
      type: 'number',
      allowNull: true,
      columnName: 'last_login_at',
      description: '最后登录时间戳'
    },

    // 最后登录IP
    lastLoginIp: {
      type: 'string',
      allowNull: true,
      maxLength: 50,
      columnName: 'last_login_ip',
      columnType: 'varchar(50)',
      description: '最后登录IP'
    },

    // 备注
    remark: {
      type: 'string',
      allowNull: true,
      columnType: 'text',
      description: '备注信息'
    }

  },

  // 自定义方法：密码验证前的钩子
  beforeCreate: async function (values, proceed) {
    // 如果需要在这里对密码进行加密处理
    // const bcrypt = require('bcrypt');
    // values.password = await bcrypt.hash(values.password, 10);
    return proceed();
  },

  beforeUpdate: async function (values, proceed) {
    // 如果更新包含密码，需要重新加密
    // if (values.password) {
    //   const bcrypt = require('bcrypt');
    //   values.password = await bcrypt.hash(values.password, 10);
    // }
    return proceed();
  }

};
