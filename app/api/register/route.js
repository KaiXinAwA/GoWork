import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
    console.log("🔍 Received request to /api/register");

    try {
        const body = await req.json();
        console.log("📝 Request Body:", body);

        const { username, email, password } = body;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields", message: "Username, email, and password are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists", message: "This email is already registered" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log("✅ User created successfully:", { userid: user.userid, email: user.email });

        // Return success response without password
        return NextResponse.json({
            message: "User registered successfully",
            user: {
                userid: user.userid,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("❌ Registration error:", error);
        
        // Handle Prisma errors
        if (error?.code === 'P2002') {
            return NextResponse.json(
                { error: "Database error", message: "A user with this email already exists" },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Server error", message: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
} 