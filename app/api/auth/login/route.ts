import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { comparePassword, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user with the provided email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        profileImage: true,
        bio: true,
      },
    });

    // Return error if user does not exist
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'User does not exist or password is incorrect' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'User does not exist or password is incorrect' },
        { status: 401 }
      );
    }

    // Create token for the user
    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set the token as an HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Return user data without the password
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      token, // Include token in the response so it can be stored in localStorage as well
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}