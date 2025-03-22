import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, otp, newPassword } = await request.json();

    // Validate input
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Find user and check OTP
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify OTP
    if (user.resetOTP !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (new Date() > user.resetOTPExpiry) {
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear OTP
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetOTP: null,
        resetOTPExpiry: null,
      },
    });

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 