import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Find all users who don't have any resumes
    const usersWithoutResumes = await prisma.user.findMany({
      where: {
        resumes: {
          none: {}
        }
      }
    });

    console.log(`Found ${usersWithoutResumes.length} users without resumes`);

    // Create initial resume records for these users
    const createdResumes = await Promise.all(
      usersWithoutResumes.map(user =>
        prisma.resume.create({
          data: {
            userid: user.userid,
            filename: '',
            filepath: '',
            education: '',
            language: ''
          }
        })
      )
    );

    return NextResponse.json({
      message: `Created ${createdResumes.length} resume records`,
      resumes: createdResumes
    });
  } catch (error) {
    console.error('Error initializing resumes:', error);
    return NextResponse.json(
      { error: 'Failed to initialize resumes' },
      { status: 500 }
    );
  }
} 