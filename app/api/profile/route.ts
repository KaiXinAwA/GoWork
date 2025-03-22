import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

// Get current user profile
export async function GET(request: Request) {
  try {
    // Try to get user ID from session cookie first
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    // Try to get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    let userId: number | undefined;
    
    if (sessionCookie) {
      // Get user ID from session cookie
      const session = JSON.parse(sessionCookie.value);
      userId = session.userId;
    } else if (token) {
      // Verify token and get user ID
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: number };
        userId = decoded.userId;
      } catch (error) {
        console.error('Token verification failed:', error);
      }
    }
    
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Get user and their latest resume
    const user = await prisma.user.findUnique({
      where: {
        userid: userId,
      } as Prisma.UserWhereUniqueInput,
      include: {
        resumes: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      } as Prisma.UserInclude,
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    // Get the latest resume
    const latestResume = user.resumes[0];

    // Return user profile data
    return NextResponse.json({
      userid: user.userid,
      username: user.username,
      email: user.email,
      resume: latestResume?.filename || null,
      education: latestResume?.education || null,
      language: latestResume?.language || null,
    });
  } catch (error) {
    console.error('Error in GET /api/profile:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

// Update user profile
export async function PATCH(request: Request) {
  try {
    // Try to get user ID from session cookie first
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    // Try to get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    let userId: number | undefined;
    
    if (sessionCookie) {
      // Get user ID from session cookie
      const session = JSON.parse(sessionCookie.value);
      userId = session.userId;
    } else if (token) {
      // Verify token and get user ID
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: number };
        userId = decoded.userId;
      } catch (error) {
        console.error('Token verification failed:', error);
      }
    }
    
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const data = await request.json();
    const { username, education, language } = data;

    // Validate username length
    if (username && username.length < 2) {
      return new NextResponse(
        JSON.stringify({ error: 'Username must be at least 2 characters long' }),
        { status: 400 }
      );
    }

    // Update user data
    const user = await prisma.user.update({
      where: {
        userid: userId,
      } as Prisma.UserWhereUniqueInput,
      data: {
        username,
      },
      include: {
        resumes: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      } as Prisma.UserInclude,
    });

    // Update resume if education or language is provided
    if (education || language) {
      const latestResume = user.resumes[0];
      
      if (latestResume) {
        await prisma.resume.update({
          where: {
            resumeid: latestResume.resumeid,
          } as Prisma.ResumeWhereUniqueInput,
          data: {
            education: education || latestResume.education,
            language: language || latestResume.language,
          },
        });
      } else {
        // Create new resume if none exists
        await prisma.resume.create({
          data: {
            userid: userId,
            filename: '',
            filepath: '',
            education: education || '',
            language: language || '',
          },
        });
      }
    }

    // Get updated user data
    const updatedUser = await prisma.user.findUnique({
      where: {
        userid: userId,
      } as Prisma.UserWhereUniqueInput,
      include: {
        resumes: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      } as Prisma.UserInclude,
    });

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    const latestResume = updatedUser.resumes[0];

    return NextResponse.json({
      userid: updatedUser.userid,
      username: updatedUser.username,
      email: updatedUser.email,
      resume: latestResume?.filename || null,
      education: latestResume?.education || null,
      language: latestResume?.language || null,
    });
  } catch (error) {
    console.error('Error in PATCH /api/profile:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
} 