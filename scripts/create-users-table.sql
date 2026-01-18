-- 创建用户表
-- PostgreSQL 数据库脚本

-- 删除现有表（如果存在）
DROP TABLE IF EXISTS users CASCADE;

-- 创建用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    real_name VARCHAR(50),
    phone VARCHAR(20),
    gender INTEGER DEFAULT 0,
    role VARCHAR(20) DEFAULT 'tenant' NOT NULL,
    avatar TEXT,
    status INTEGER DEFAULT 1,
    last_login_at BIGINT,
    last_login_ip VARCHAR(50),
    remark TEXT,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

-- 创建索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- 添加注释
COMMENT ON TABLE users IS '用户表';
COMMENT ON COLUMN users.id IS '主键ID';
COMMENT ON COLUMN users.username IS '用户名，唯一';
COMMENT ON COLUMN users.email IS '邮箱，唯一';
COMMENT ON COLUMN users.password IS '密码（加密）';
COMMENT ON COLUMN users.real_name IS '真实姓名';
COMMENT ON COLUMN users.phone IS '手机号';
COMMENT ON COLUMN users.gender IS '性别 (0:未知, 1:男, 2:女)';
COMMENT ON COLUMN users.role IS '角色 (admin:管理员, tenant:租户)';
COMMENT ON COLUMN users.avatar IS '头像Base64编码';
COMMENT ON COLUMN users.status IS '状态 (0:禁用, 1:正常)';
COMMENT ON COLUMN users.last_login_at IS '最后登录时间戳';
COMMENT ON COLUMN users.last_login_ip IS '最后登录IP';
COMMENT ON COLUMN users.remark IS '备注信息';
COMMENT ON COLUMN users.created_at IS '创建时间戳';
COMMENT ON COLUMN users.updated_at IS '更新时间戳';

-- 插入测试数据
INSERT INTO users (username, email, password, real_name, phone, gender, role, status, created_at, updated_at) 
VALUES 
    ('admin', 'admin@example.com', 'admin123', '管理员', '13800138000', 1, 'admin', 1, EXTRACT(EPOCH FROM NOW()) * 1000, EXTRACT(EPOCH FROM NOW()) * 1000),
    ('test', 'test@example.com', 'test123', '测试租户', '13800138001', 2, 'tenant', 1, EXTRACT(EPOCH FROM NOW()) * 1000, EXTRACT(EPOCH FROM NOW()) * 1000);

-- 查询验证
SELECT * FROM users;
