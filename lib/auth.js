import * as bcrypt from 'bcrypt';
import { verify, sign } from 'jsonwebtoken';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma.js";

// Validate environment variables
function validateEnvironment() {
  if (!process.env.NEXTAUTH_SECRET) {
    const errorMessage = 'NEXTAUTH_SECRET environment variable is not set';
    if (process.env.NODE_ENV !== 'production') {
      console.warn(errorMessage + ' - Using temporary key in development');
      return 'temporary-dev-secret-key-do-not-use-in-production';
    } else {
      console.error(errorMessage);
      return null;
    }
  }
  return process.env.NEXTAUTH_SECRET;
}

const SECRET_KEY = validateEnvironment();

/**
 * Hash a password
 */
export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password, hash) {
  try {
    console.log('Comparing passwords:', {
      hasPassword: !!password,
      hasHash: !!hash
    });
    return bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
}

/**
 * Create a JWT token
 */
export function createToken(payload, expiresIn = '7d') {
  const secretKey = SECRET_KEY || 'temporary-key-for-development';
  
  if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
    throw new Error('Server configuration error: Missing authentication key');
  }
  
  return sign(payload, secretKey, { expiresIn });
}

/**
 * Verify a JWT token and return decoded user info
 */
export async function verifyToken(token) {
  try {
    const secretKey = SECRET_KEY || 'temporary-key-for-development';
    
    if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
      throw new Error('Server configuration error: Missing authentication key');
    }
    
    const decoded = verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            userid: true,
            email: true,
            username: true,
            password: true,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValid = await comparePassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          userid: user.userid,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userid = user.userid;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userid = token.userid;
        session.user.username = token.username;
      }
      return session;
    },
  },
}; 