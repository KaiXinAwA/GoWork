import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    // 从 cookie 获取令牌
    const token = request.headers.get("cookie")?.split("session=")?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    // 验证令牌
    const decoded = verify(
      token,
      process.env.NEXTAUTH_SECRET || "fallback-secret"
    ) as any;

    const { oldPassword, newPassword } = await request.json();

    // 获取用户
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      );
    }

    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "旧密码不正确" },
        { status: 400 }
      );
    }

    // 哈希新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "密码已成功更新" });
  } catch (error) {
    console.error("密码更新错误:", error);
    return NextResponse.json(
      { error: "内部服务器错误" },
      { status: 500 }
    );
  }
}