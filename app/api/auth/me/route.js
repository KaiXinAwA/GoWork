import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import JobList from "@/components/jobs/job-list";

export async function GET() {
  try {
    // First check Authorization header
    const headersList = headers();
    const authHeader = headersList.get('Authorization');
    
    let token;
    
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // If no Bearer token, try to get from cookie
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get('session');
      token = sessionCookie?.value;
    }

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
      const userId = decoded.userId;

      const user = await prisma.user.findFirst({
        where: {
          userid: userId
        },
        include: {
          resumes: {
            orderBy: {
              resumeid: 'desc'
            },
            take: 1
          }
        }
      });

      if (!user) {
        return new NextResponse('User not found', { status: 401 });
      }

      const latestResume = user.resumes[0];

      return NextResponse.json({
        userid: user.userid,
        username: user.username,
        email: user.email,
        role: user.role,
        resume: latestResume?.filename || null,
        education: latestResume?.education || null,
        language: latestResume?.language || null,
      });
    } catch (tokenError) {
      console.error('Token verification error:', tokenError);
      return new NextResponse('Invalid or expired token', { status: 401 });
    }
  } catch (error) {
    console.error('Get user error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 