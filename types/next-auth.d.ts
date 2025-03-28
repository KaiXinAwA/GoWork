import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: UserRole
      username: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email: string
    role: UserRole
    username: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    username: string
  }
} 