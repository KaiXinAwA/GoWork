import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      image?: string | null
      profileImage?: string | null
      bio?: string | null
      phone?: string | null
      location?: string | null
      experience?: number | null
    }
  }

  interface User {
    id: string
    name: string
    email: string
    role: UserRole
    image?: string | null
    profileImage?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    experience?: number | null
  }
} 