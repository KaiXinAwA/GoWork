import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

interface Params {
  params: {
    id: string;
  };
}

// Get a specific application
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Get the application
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            employer: {
              select: {
                id: true,
              },
            },
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
    });
    
    if (!application) {
      return new NextResponse('Application not found', { status: 404 });
    }
    
    // Check permissions: only the applicant or the job poster can view
    if (
      userId !== application.userId &&
      userId !== application.job.employer.id
    ) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Update an application status (employer only)
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Get the application
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
      },
    });
    
    if (!application) {
      return new NextResponse('Application not found', { status: 404 });
    }
    
    // Check if the user is the employer who posted the job
    const job = await prisma.job.findUnique({
      where: { id: application.jobId },
    });
    
    if (!job || job.employerId !== userId) {
      return new NextResponse(
        'Forbidden - Only the employer who posted the job can update applications',
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { status } = body;
    
    if (!status || !['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return new NextResponse('Invalid application status', { status: 400 });
    }
    
    // Update the application
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Delete an application (job seeker only - withdraw their application)
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // Get the application
    const application = await prisma.application.findUnique({
      where: { id },
    });
    
    if (!application) {
      return new NextResponse('Application not found', { status: 404 });
    }
    
    // Check if the user is the applicant
    if (application.userId !== userId) {
      return new NextResponse(
        'Forbidden - You can only withdraw your own applications',
        { status: 403 }
      );
    }
    
    // Delete the application
    await prisma.application.delete({
      where: { id },
    });
    
    return new NextResponse('Application withdrawn successfully', {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 