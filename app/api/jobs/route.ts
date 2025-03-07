import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Get all jobs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const location = searchParams.get('location');
    
    const jobs = await prisma.job.findMany({
      where: {
        ...(title ? { title: { contains: title } } : {}),
        ...(location ? { location: { contains: location } } : {}),
      },
      include: {
        employer: {
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
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Create a new job (employer only)
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Check if user is an employer
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user || user.role !== 'EMPLOYER') {
      return new NextResponse('Forbidden - Only employers can create jobs', {
        status: 403,
      });
    }
    
    const body = await request.json();
    const { title, description, companyName, location, salary, requirements } = body;
    
    // Validate required fields
    if (!title || !description || !companyName || !location) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    
    // Create the job
    const job = await prisma.job.create({
      data: {
        title,
        description,
        companyName,
        location,
        salary,
        requirements,
        employerId: userId,
      },
    });
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 