import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/about',
  '/help',
  '/jobs',
];

// Paths that require employer role
const employerPaths = ['/employer'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  
  // Check if the user is trying to access a protected route
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // If no session cookie, redirect to login
  if (!sessionCookie) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.set({
      name: 'redirect',
      value: pathname,
      path: '/',
    });
    return response;
  }
  
  // Special handling for employer paths
  const isEmployerPath = employerPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  if (isEmployerPath) {
    try {
      // Get the base URL from the request
      const baseUrl = request.headers.get('x-forwarded-proto')
        ? `${request.headers.get('x-forwarded-proto')}://${request.headers.get('x-forwarded-host')}`
        : request.url;
      
      // Fetch the user from the API to check their role
      const userResponse = await fetch(new URL('/api/auth/me', baseUrl), {
        headers: {
          Cookie: `session=${sessionCookie.value}`,
        },
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const user = await userResponse.json();
      
      // If the user is not an employer, redirect to the home page
      if (user.role !== 'EMPLOYER') {
        return NextResponse.redirect(new URL('/', baseUrl));
      }
    } catch (error) {
      // In case of error, redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.set({
        name: 'redirect',
        value: pathname,
        path: '/',
      });
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static files (/_next, /images, etc.)
     */
    '/((?!_next/static|_next/image|images|api|favicon.ico|.*\\.).*)',
  ],
}; 