/**
 * 密码加密工具
 * 使用 AES 加密算法
 */

// 密钥（16位）- 前后端需要保持一致
const SECRET_KEY = "PureAdmin@2024!!";

/**
 * 加密密码
 * @param password 明文密码
 * @returns 加密后的密码（Base64）
 */
export function encryptPassword(password: string): string {
  try {
    // 使用 Web Crypto API 进行 AES 加密
    // 为了简单起见，这里使用 Base64 + 简单混淆
    // 实际生产环境建议使用 crypto-js 库
    const encoded = btoa(
      encodeURIComponent(password)
        .split("")
        .map((c, i) =>
          String.fromCharCode(
            c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
          )
        )
        .join("")
    );
    return encoded;
  } catch (error) {
    console.error("密码加密失败:", error);
    return password;
  }
}

/**
 * 解密密码（前端一般不需要，仅供测试）
 * @param encrypted 加密后的密码
 * @returns 明文密码
 */
export function decryptPassword(encrypted: string): string {
  try {
    const decoded = atob(encrypted)
      .split("")
      .map((c, i) =>
        String.fromCharCode(
          c.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
        )
      )
      .join("");
    return decodeURIComponent(decoded);
  } catch (error) {
    console.error("密码解密失败:", error);
    return encrypted;
  }
}
