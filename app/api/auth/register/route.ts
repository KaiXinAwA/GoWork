import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, companyName, companyDescription } = body;
    
    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required information', message: 'Email, password, and role are required' },
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
        role: role as 'ADMIN' | 'JOBSEEKER' | 'EMPLOYER',
        name: name || (companyName || email.split('@')[0]), // Use provided name, company name, or email prefix as name
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
          role: user.role
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Provide more detailed error information
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message || 'An error occurred during registration, please try again later'
      },
      { status: 500 }
    );
  }
} 