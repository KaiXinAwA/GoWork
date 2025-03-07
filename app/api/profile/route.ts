import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { hashPassword } from '@/lib/auth';

// Get current user profile
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        bio: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Update user profile
export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = sessionCookie.value;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }
    
    const body = await request.json();
    const { name, bio, profileImage, currentPassword, newPassword } = body;
    
    // Validate data
    if (name && name.length < 2) {
      return new NextResponse('Name must be at least 2 characters', {
        status: 400,
      });
    }
    
    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (profileImage) updateData.profileImage = profileImage;
    
    // Handle password change if requested
    if (newPassword) {
      // Implement password change logic here
      if (!currentPassword) {
        return new NextResponse('Current password is required', { status: 400 });
      }
      
      // Hash new password
      const hashedPassword = await hashPassword(newPassword);
      updateData.password = hashedPassword;
    }
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        bio: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 