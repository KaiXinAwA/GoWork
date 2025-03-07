import * as bcrypt from 'bcrypt';
import { verify, sign, SignOptions, Secret, JwtPayload } from 'jsonwebtoken';

// 验证必要的环境变量并提供合理的错误处理
function validateEnvironment(): string | null {
  if (!process.env.NEXTAUTH_SECRET) {
    const errorMessage = 'NEXTAUTH_SECRET 环境变量未设置';
    // 在开发环境抛出错误，在生产环境记录错误但继续运行
    if (process.env.NODE_ENV !== 'production') {
      console.warn(errorMessage + ' - 在开发环境中使用临时密钥');
      return 'temporary-dev-secret-key-do-not-use-in-production';
    } else {
      console.error(errorMessage);
      return null;
    }
  }
  return process.env.NEXTAUTH_SECRET;
}

// 在应用启动时验证环境变量
const SECRET_KEY = validateEnvironment();

/**
 * 对密码进行哈希处理
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * 比较密码与哈希值
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * 创建JWT令牌
 */
export function createToken(payload: object, expiresIn: number | string = '7d'): string {
  const secretKey = SECRET_KEY || 'temporary-key-for-development';
  
  // 在生产环境中，如果没有设置密钥，拒绝所有请求
  if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
    throw new Error('服务器配置错误: 缺少认证密钥');
  }
  
  // 使用类型断言来解决类型问题
  const options = { expiresIn } as SignOptions;
  return sign(payload, secretKey as Secret, options);
}

/**
 * 验证JWT令牌并返回解码后的用户信息
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    // 获取密钥
    const secretKey = SECRET_KEY || 'temporary-key-for-development';
    
    // 在生产环境中，如果没有设置密钥，拒绝所有请求
    if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
      throw new Error('服务器配置错误: 缺少认证密钥');
    }
    
    const decoded = verify(token, secretKey as Secret);
    return decoded;
  } catch (error) {
    throw new Error('无效的令牌');
  }
}