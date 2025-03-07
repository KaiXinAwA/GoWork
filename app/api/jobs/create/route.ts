import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 获取 cookie 中的令牌
    const token = request.headers.get("cookie")?.split("session=")?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 验证令牌
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
      description,
      companyName,
      location,
      salary,
      requirements,
      categoryId, // 确保前端传入 categoryId
    } = body;

    // 创建职位
    const job = await prisma.job.create({
      data: {
        title,
        description,
        companyName,
        location,
        salary,
        requirements,
        type: type || "FULL_TIME", // 设置默认值
        // 使用 connect 关联现有记录
        employer: {
          connect: { id: decoded.id } // 使用当前用户 ID
        },
        category: {
          connect: { id: categoryId } // 使用传入的分类 ID
        }
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}