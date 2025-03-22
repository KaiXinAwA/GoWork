import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { comparePassword, createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Login attempt for email:', email);

    // Validate required fields
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user with the provided email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        userid: true,
        email: true,
        username: true,
        password: true,
      },
    });

    console.log('User found:', user ? {
      userid: user.userid,
      email: user.email,
      username: user.username,
      hasPassword: !!user.password
    } : 'No user found');

    // Return error if user does not exist
    if (!user) {
      console.log('No user found with email:', email);
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'User does not exist or password is incorrect' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    console.log('Password validation:', {
      providedPassword: !!password,
      storedPasswordHash: !!user.password,
      isValid: isPasswordValid
    });

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'User does not exist or password is incorrect' },
        { status: 401 }
      );
    }

    // Create token for the user
    const token = createToken({
      userid: user.userid,
      email: user.email,
      username: user.username,
    });

    console.log('Token created successfully for user:', email);

    // Set the token as an HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    console.log('Cookie set successfully');

    // Return user data without the password
    return NextResponse.json({
      userid: user.userid,
      email: user.email,
      username: user.username,
      token, // Include token in the response so it can be stored in localStorage as well
    });
  } catch (error) {
    console.error('Login error details:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 