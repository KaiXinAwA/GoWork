import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Get all applications for the current user
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }
    
    let applications;
    
    if (user.role === 'JOBSEEKER') {
      // Get applications submitted by the job seeker
      applications = await prisma.application.findMany({
        where: { userId },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              companyName: true,
              location: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else if (user.role === 'EMPLOYER') {
      // Get applications for jobs posted by the employer
      applications = await prisma.application.findMany({
        where: {
          job: {
            employerId: userId,
          },
        },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              companyName: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      return new NextResponse('Invalid user role', { status: 400 });
    }
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Create a new application (job seeker only)
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Check if user is a job seeker
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user || user.role !== 'JOBSEEKER') {
      return new NextResponse('Forbidden - Only job seekers can apply for jobs', {
        status: 403,
      });
    }
    
    const body = await request.json();
    const { jobId, coverLetter, resume } = body;
    
    // Validate required fields
    if (!jobId) {
      return new NextResponse('Job ID is required', { status: 400 });
    }
    
    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });
    
    if (!job) {
      return new NextResponse('Job not found', { status: 404 });
    }
    
    // Check if user has already applied for this job
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId,
        jobId,
      },
    });
    
    if (existingApplication) {
      return new NextResponse('You have already applied for this job', {
        status: 409,
      });
    }
    
    // Create the application
    const application = await prisma.application.create({
      data: {
        userId,
        jobId,
        coverLetter,
        resume,
      },
    });
    
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 