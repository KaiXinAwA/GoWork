import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function PUT(request) {
  try {
    // Get token from cookie
    const token = request.headers.get("cookie")?.split("session=")?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verify(
      token,
      process.env.NEXTAUTH_SECRET || "fallback-secret"
    );

    const { oldPassword, newPassword } = await request.json();

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid old password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 