import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    let userId: number | undefined;
    
    if (token) {
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

    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const education = formData.get('education') as string;
    const language = formData.get('language') as string;

    if (!file) {
      return new NextResponse(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('application/pdf') && !file.type.startsWith('image/')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid file type. Only PDF and image files are allowed.' }),
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse(
        JSON.stringify({ error: 'File size too large. Maximum size is 5MB.' }),
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    await writeFile(join(uploadsDir, file.name), Buffer.from(await file.arrayBuffer()));

    // Get user's latest resume
    const user = await prisma.user.findUnique({
      where: { userid: userId },
      include: {
        resumes: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    // Update or create resume
    const resumeData = {
      filename: file.name,
      filepath: `/uploads/${file.name}`,
      education: education || null,
      language: language || null,
    };

    let resume;
    if (user.resumes.length > 0) {
      resume = await prisma.resume.update({
        where: { resumeid: user.resumes[0].resumeid },
        data: resumeData,
      });
    } else {
      resume = await prisma.resume.create({
        data: {
          ...resumeData,
          userid: userId,
        },
      });
    }

    return NextResponse.json({
      message: 'Resume updated successfully',
      resume: {
        filename: resume.filename,
        education: resume.education,
        language: resume.language,
      },
    });
  } catch (error) {
    console.error('Error in POST /api/profile/update:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
} 