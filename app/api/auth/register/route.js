import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    // Ensure the request is JSON
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type', message: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, password, role, companyName, companyDescription } = body;
    
    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required information', message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['JOBSEEKER', 'EMPLOYER'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role', message: 'Role must be either JOBSEEKER or EMPLOYER' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists', message: 'This email is already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role,
        name: name || (companyName || email.split('@')[0]),
        bio: companyDescription || '',
      },
    });

    // Return success response without password
    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Prisma errors
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Database error', message: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { 
        error: 'Server error', 
        message: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 