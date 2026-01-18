import { http } from "@/utils/http";
import { encryptPassword } from "@/utils/crypto";

// 用户管理相关类型
export type UserResult = {
  success: boolean;
  data?: {
    list: Array<any>;
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  message?: string;
};

export type UserDetailResult = {
  success: boolean;
  data?: any;
  message?: string;
};

export type UserOperationResult = {
  success: boolean;
  data?: any;
  message?: string;
};

// 登录相关类型（保持兼容）
export type LoginResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录（保持兼容） */
export const getLogin = (data?: object) => {
  // 加密密码
  if (data && (data as any).password) {
    (data as any).password = encryptPassword((data as any).password);
  }
  return http.request<LoginResult>("post", "/login", { data });
};

/** 刷新`token`（保持兼容） */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 获取用户列表 */
export const getUserList = (data?: object) => {
  return http.request<UserResult>("get", "/api/users", { params: data });
};

/** 获取用户详情 */
export const getUserDetail = (id: number) => {
  return http.request<UserDetailResult>("get", `/api/users/${id}`);
};

/** 创建用户 */
export const createUser = (data: object) => {
  return http.request<UserOperationResult>("post", "/api/users", { data });
};

/** 更新用户 */
export const updateUser = (id: number, data: object) => {
  return http.request<UserOperationResult>("put", `/api/users/${id}`, { data });
};

/** 删除用户 */
export const deleteUser = (id: number) => {
  return http.request<UserOperationResult>("delete", `/api/users/${id}`);
};

/** 测试数据库连接 */
export const testDatabaseConnection = () => {
  return http.request<any>("get", "/api/database/test");
};
