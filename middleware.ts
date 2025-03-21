import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define path configurations
const pathConfig = {
  public: [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/about',
    '/help',
    '/jobs',
    '/api/jobs',  // Allow public access to jobs API
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/api/auth/me',
  ],
  employer: [
    '/employer',
    '/employer/dashboard',
    '/employer/jobs',
    '/employer/applications',
    '/employer/profile',
    '/api/employer',
  ],
  jobseeker: [
    '/dashboard',
    '/jobseeker',
    '/jobseeker/applications',
    '/jobseeker/saved-jobs',
    '/jobseeker/profile',
    '/api/jobseeker',
  ],
  admin: [
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/jobs',
    '/admin/categories',
    '/admin/analytics',
    '/api/admin',
  ],
};

// Get allowed origins
const getAllowedOrigins = () => {
  // Allow local testing in development
  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }
  
  // Only allow specific domains in production
  return [
    'https://gowork.example.com',
    'https://www.gowork.example.com'
  ];
};

// Check if path matches pattern
const matchPath = (pathname: string, patterns: string[]) => {
  return patterns.some(pattern => 
    pathname === pattern || 
    pathname.startsWith(`${pattern}/`) ||
    (pattern.includes('*') && new RegExp(pattern.replace('*', '.*')).test(pathname))
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle CORS
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin') || '';
    if (getAllowedOrigins().includes(origin)) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
  }

  // Check if it's a public path
  if (matchPath(pathname, pathConfig.public)) {
    return NextResponse.next();
  }

  // Check if it's an API route - let API routes handle their own authentication
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get user token
  const token = await getToken({ req: request });

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check permissions based on user role
  const userRole = token.role as string;
  
  if (userRole === 'ADMIN') {
    // Admins can access all paths
    return NextResponse.next();
  }
  
  if (userRole === 'EMPLOYER' && matchPath(pathname, pathConfig.employer)) {
    return NextResponse.next();
  }
  
  if (userRole === 'JOBSEEKER' && matchPath(pathname, pathConfig.jobseeker)) {
    return NextResponse.next();
  }

  // Redirect to appropriate homepage based on role
  if (userRole === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  } else if (userRole === 'EMPLOYER') {
    return NextResponse.redirect(new URL('/employer', request.url));
  } else if (userRole === 'JOBSEEKER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If role is unrecognized, redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}

// Configure middleware matching paths
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};