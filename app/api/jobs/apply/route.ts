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

    if (decoded.role !== "JOBSEEKER") {
      return NextResponse.json(
        { error: "Only job seekers can apply for jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { jobId } = body;

    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: decoded.userId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: decoded.userId,
        status: "PENDING",
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 