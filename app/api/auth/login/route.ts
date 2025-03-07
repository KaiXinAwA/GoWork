import { NextResponse } from 'next/server';
import { comparePassword } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return new NextResponse('Missing email or password', { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    // Compare the password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }
    // 创建JWT令牌
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    // 设置会话cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: 'session',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1周
    });
    // 返回不含密码的用户信息
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      ...userWithoutPassword,
      token // 同时返回token给前端
    });
  } catch (error) {
    console.error('Login error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}