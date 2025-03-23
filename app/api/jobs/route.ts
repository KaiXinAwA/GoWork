import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        applications: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (session.user?.role !== 'EMPLOYER') {
      return NextResponse.json(
        { error: 'Only employers can create jobs' },
        { status: 403 }
      )
    }

    const data = await request.json()
    
    // 验证必需字段
    const requiredFields = ['title', 'companyName', 'location', 'description', 'categoryId'] as const
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      )
    }

    // 验证字段类型
    if (data.type && !['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'].includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid job type' },
        { status: 400 }
      )
    }

    // 验证过期时间
    if (data.expiresAt && new Date(data.expiresAt) <= new Date()) {
      return NextResponse.json(
        { error: 'Expiration date must be in the future' },
        { status: 400 }
      )
    }

    const job = await prisma.job.create({
      data: {
        title: data.title,
        companyName: data.companyName,
        location: data.location,
        description: data.description,
        requirements: data.requirements,
        salary: data.salary,
        type: data.type || 'FULL_TIME',
        experienceLevel: data.experienceLevel,
        employerId: session.user.id,
        categoryId: data.categoryId,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        isActive: true,
      },
      include: {
        employer: true,
        category: true,
        skills: true,
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error creating job:', error)
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A job with this title already exists' },
          { status: 409 }
        )
      }
      if (error.code === 'P2003') {
        return NextResponse.json(
          { error: 'Invalid category or employer ID' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
} 