export function hashPassword(password: string): Promise<string>;
export function verifyPassword(password: string, hashedPassword: string): Promise<boolean>; 