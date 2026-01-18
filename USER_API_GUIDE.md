# 用户管理系统 - 使用指南

## 📋 概述

本项目基于 Sails.js ORM 创建了完整的用户管理系统，包括：
- ✅ User 模型（ORM定义）
- ✅ RESTful API 接口
- ✅ Vue3 前端管理页面
- ✅ PostgreSQL 数据库脚本

---

## 🗄️ 数据库配置

### 1. 配置数据库连接

在项目根目录创建 `.env` 文件（如果不存在）：

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=sails
```

### 2. 创建数据库表

有两种方式创建用户表：

#### 方式一：使用 Sails.js ORM 自动建表（推荐）

已配置 `migrate: 'alter'`，启动服务时会自动创建/更新表结构：

```bash
node app.js
```

#### 方式二：手动执行 SQL 脚本

```bash
psql -U postgres -d sails -f scripts/create-users-table.sql
```

---

## 🚀 API 接口

### 基础路径
所有用户API的基础路径为：`http://localhost:1337/api`

### 接口列表

#### 1. 获取用户列表
```http
GET /api/users?page=1&pageSize=10&username=&email=&status=
```

**查询参数：**
- `page`: 页码（默认：1）
- `pageSize`: 每页数量（默认：10）
- `username`: 用户名搜索（可选）
- `email`: 邮箱搜索（可选）
- `status`: 状态筛选 0/1（可选）

**响应示例：**
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "realName": "管理员",
        "phone": "13800138000",
        "gender": 1,
        "status": 1,
        "createdAt": 1737273600000,
        "updatedAt": 1737273600000
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

#### 2. 获取用户详情
```http
GET /api/users/:id
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "realName": "管理员",
    "phone": "13800138000",
    "gender": 1,
    "status": 1,
    "createdAt": 1737273600000,
    "updatedAt": 1737273600000
  }
}
```

#### 3. 创建用户
```http
POST /api/users
Content-Type: application/json
```

**请求体：**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456",
  "realName": "测试用户",
  "phone": "13800138001",
  "gender": 1,
  "status": 1,
  "remark": "这是备注"
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "用户创建成功",
  "data": {
    "id": 2,
    "username": "testuser",
    "email": "test@example.com",
    "realName": "测试用户",
    "createdAt": 1737273600000,
    "updatedAt": 1737273600000
  }
}
```

#### 4. 更新用户
```http
PUT /api/users/:id
Content-Type: application/json
```

**请求体：**
```json
{
  "realName": "新名字",
  "phone": "13900139000",
  "status": 0
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "用户更新成功",
  "data": {
    "id": 2,
    "username": "testuser",
    "email": "test@example.com",
    "realName": "新名字",
    "phone": "13900139000",
    "status": 0,
    "updatedAt": 1737273700000
  }
}
```

#### 5. 删除用户
```http
DELETE /api/users/:id
```

**响应示例：**
```json
{
  "success": true,
  "message": "用户删除成功"
}
```

#### 6. 测试数据库连接
```http
GET /api/database/test
```

**响应示例：**
```json
{
  "success": true,
  "message": "数据库连接成功！",
  "timestamp": "2026-01-19T12:00:00.000Z",
  "connection": {
    "adapter": "sails-postgresql",
    "host": "localhost",
    "port": 5432,
    "database": "sails",
    "user": "postgres"
  }
}
```

---

## 🎨 前端页面

### 页面位置
```
pure-admin-thin/src/views/user/index.vue
```

### API 封装
```
pure-admin-thin/src/api/user.ts
```

### 功能特性
- ✅ 用户列表展示（分页）
- ✅ 搜索过滤（用户名、邮箱、状态）
- ✅ 添加用户
- ✅ 编辑用户
- ✅ 删除用户（带确认）
- ✅ 表单验证
- ✅ 响应式设计

### 启动前端项目
```bash
cd pure-admin-thin
pnpm install
pnpm dev
```

---

## 📊 User 模型字段说明

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | number | 是 | 主键ID，自增 |
| username | string | 是 | 用户名，唯一 |
| email | string | 是 | 邮箱，唯一 |
| password | string | 是 | 密码（应加密存储） |
| realName | string | 否 | 真实姓名 |
| phone | string | 否 | 手机号码 |
| gender | number | 否 | 性别（0:未知, 1:男, 2:女） |
| avatar | string | 否 | 头像URL |
| status | number | 否 | 状态（0:禁用, 1:正常），默认1 |
| lastLoginAt | number | 否 | 最后登录时间戳 |
| lastLoginIp | string | 否 | 最后登录IP |
| remark | string | 否 | 备注信息 |
| createdAt | number | 是 | 创建时间戳（自动） |
| updatedAt | number | 是 | 更新时间戳（自动） |

---

## 🔧 测试步骤

### 1. 测试数据库连接
```bash
curl http://localhost:1337/api/database/test
```

### 2. 创建测试用户
```bash
curl -X POST http://localhost:1337/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test001",
    "email": "test001@example.com",
    "password": "123456",
    "realName": "测试用户001",
    "phone": "13800138001",
    "gender": 1,
    "status": 1
  }'
```

### 3. 查询用户列表
```bash
curl http://localhost:1337/api/users?page=1&pageSize=10
```

### 4. 获取用户详情
```bash
curl http://localhost:1337/api/users/1
```

### 5. 更新用户
```bash
curl -X PUT http://localhost:1337/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "realName": "更新后的名字",
    "status": 0
  }'
```

### 6. 删除用户
```bash
curl -X DELETE http://localhost:1337/api/users/1
```

---

## 📁 项目结构

```
node-server-sails/
├── api/
│   ├── models/
│   │   └── User.js                    # User ORM 模型
│   └── controllers/
│       ├── database/
│       │   └── test-connection.js     # 数据库连接测试
│       └── user/
│           ├── list.js                # 用户列表
│           ├── detail.js              # 用户详情
│           ├── create.js              # 创建用户
│           ├── update.js              # 更新用户
│           └── delete.js              # 删除用户
├── config/
│   ├── datastores.js                  # 数据库配置
│   ├── models.js                      # 模型配置（migrate: 'alter'）
│   └── routes.js                      # 路由配置
├── scripts/
│   └── create-users-table.sql         # 手动建表SQL脚本
└── pure-admin-thin/
    └── src/
        ├── api/
        │   └── user.ts                # API封装
        └── views/
            └── user/
                └── index.vue          # 用户管理页面
```

---

## ⚠️ 注意事项

### 密码安全
当前示例中密码是明文存储的，生产环境请务必：
1. 安装 bcrypt: `npm install bcrypt`
2. 在 User 模型的 `beforeCreate` 和 `beforeUpdate` 钩子中加密密码
3. 创建密码验证方法

### 生产环境配置
- 将 `migrate` 设置为 `'safe'`
- 使用环境变量管理敏感配置
- 启用 HTTPS
- 添加认证中间件
- 实现权限控制

### ORM 自动迁移
- 开发环境：使用 `migrate: 'alter'` 自动更新表结构
- 生产环境：Sails.js 会自动切换为 `migrate: 'safe'`
- 数据库表会根据模型定义自动创建和更新

---

## 🎯 快速开始

1. 配置数据库连接（.env 文件）
2. 启动后端服务：`node app.js`
3. 测试数据库连接：`curl http://localhost:1337/api/database/test`
4. 启动前端项目：`cd pure-admin-thin && pnpm dev`
5. 访问用户管理页面

---

## 📞 技术支持

如有问题，请查看：
- Sails.js 文档: https://sailsjs.com/documentation
- Waterline ORM: https://sailsjs.com/documentation/concepts/models-and-orm
