import * as bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * 验证JWT令牌并返回解码后的用户信息
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    const decoded = verify(
      token,
      process.env.NEXTAUTH_SECRET || 'fallback-secret'
    );
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}