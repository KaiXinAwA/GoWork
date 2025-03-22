import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if employer already exists
    const existingEmployer = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingEmployer) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employer
    const employer = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'EMPLOYER'
      }
    });

    // Remove password from response
    const { password: _, ...employerWithoutPassword } = employer;

    return NextResponse.json({
      message: 'Employer registered successfully',
      user: employerWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register employer' },
      { status: 500 }
    );
  }
} 