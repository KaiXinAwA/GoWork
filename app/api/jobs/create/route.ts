import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
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
    ) as any;

    if (decoded.role !== "EMPLOYER") {
      return NextResponse.json(
        { error: "Only employers can post jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      type,
      location,
      salary,
      description,
      requirements,
      contactInfo,
    } = body;

    // Create job posting
    const job = await prisma.job.create({
      data: {
        title,
        type,
        location,
        salary,
        description,
        requirements,
        companyName: "Company Name", // Get from user profile
        employerId: decoded.userId,
        categoryId: "default", // You might want to make this dynamic
        isActive: true,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 