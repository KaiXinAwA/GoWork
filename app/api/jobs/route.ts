import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';  // 添加正确的导入

// 获取所有职位
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
        category: {
          select: {
            id: true,
            name: true,
          }
        }
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

// 创建新职位
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');  // 修复这一行，使用已导入的 cookies
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    // 验证用户是否为雇主
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    
    if (!user || user.role !== 'EMPLOYER') {
      return new NextResponse('Only employers can create jobs', { status: 403 });
    }
    
    const body = await request.json();
    const {
      title,
      description,
      companyName,
      location,
      salary,
      requirements,
      type,
      categoryId,
    } = body;
    
    // 创建职位
    const job = await prisma.job.create({
      data: {
        title,
        description,
        companyName,
        location,
        salary,
        requirements,
        type: type || "FULL_TIME",
        employer: {
          connect: { id: userId }
        },
        category: {
          connect: { id: categoryId }
        }
      },
    });
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// 删除这个未实现的函数
// function cookies() {
//   throw new Error('Function not implemented.');
// }
