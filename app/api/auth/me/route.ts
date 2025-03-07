import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // 首先检查 Authorization header
    // First check Authorization header
    const headersList = headers();
    const authHeader = headersList.get('Authorization');
    
    let token: string | undefined;
    
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // 如果没有 Bearer token，尝试从 cookie 获取
      // If no Bearer token, try to get from cookie
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get('session');
      token = sessionCookie?.value;
    }

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 验证令牌
    // Verify token
    try {
      const decoded = await verifyToken(token) as any;
      const userId = decoded.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          bio: true,
          role: true,
        },
      });

      if (!user) {
        return new NextResponse('User not found', { status: 401 });
      }

      return NextResponse.json(user);
    } catch (tokenError) {
      console.error('Token verification error:', tokenError);
      return new NextResponse('Invalid or expired token', { status: 401 });
    }
  } catch (error) {
    console.error('Get user error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}