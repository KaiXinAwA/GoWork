import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 验证JWT令牌
    try {
      const decoded = await verifyToken(sessionCookie.value) as any;
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
        cookieStore.delete('session');
        return new NextResponse('Unauthorized', { status: 401 });
      }

      return NextResponse.json(user);
    } catch (tokenError) {
      // 令牌无效或过期
      cookieStore.delete('session');
      return new NextResponse('Invalid or expired token', { status: 401 });
    }
  } catch (error) {
    console.error('Get user error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}