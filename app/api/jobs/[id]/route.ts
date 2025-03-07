import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

interface Params {
  params: {
    id: string;
  };
}

// Get a specific job
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    
    if (!job) {
      return new NextResponse('Job not found', { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Update a job (employer only)
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    // 验证JWT令牌
    try {
      const decoded = await verifyToken(sessionCookie.value) as any;
      const userId = decoded.userId;
      
      // 检查工作是否存在并属于该用户
      const job = await prisma.job.findUnique({
        where: { id },
      });
      
      if (!job) {
        return new NextResponse('Job not found', { status: 404 });
      }
      
      if (job.employerId !== userId) {
        return new NextResponse('Forbidden - You can only update your own jobs', {
          status: 403,
        });
      }
      
      const body = await request.json();
      const { title, description, companyName, location, salary, requirements } = body;
      
      // Update the job
      const updatedJob = await prisma.job.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(companyName && { companyName }),
          ...(location && { location }),
          ...(salary !== undefined && { salary }),
          ...(requirements !== undefined && { requirements }),
        },
      });
      
      return NextResponse.json(updatedJob);
    } catch (tokenError) {
      cookieStore.delete('session');
      return new NextResponse('Invalid or expired token', { status: 401 });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Delete a job (employer only)
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    // 验证JWT令牌
    try {
      const decoded = await verifyToken(sessionCookie.value) as any;
      const userId = decoded.userId;
      
      // 检查工作是否存在并属于该用户
      const job = await prisma.job.findUnique({
        where: { id },
      });
      
      if (!job) {
        return new NextResponse('Job not found', { status: 404 });
      }
      
      if (job.employerId !== userId) {
        return new NextResponse('Forbidden - You can only delete your own jobs', {
          status: 403,
        });
      }
      
      // 删除相关申请
      await prisma.application.deleteMany({
        where: { jobId: id },
      });
      
      // 删除工作
      await prisma.job.delete({
        where: { id },
      });
      
      return new NextResponse('Job deleted successfully', { status: 200 });
    } catch (tokenError) {
      cookieStore.delete('session');
      return new NextResponse('Invalid or expired token', { status: 401 });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}