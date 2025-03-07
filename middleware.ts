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

// 获取允许的域名列表
const getAllowedOrigins = () => {
  // 在开发环境中允许本地测试
  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }
  
  // 在生产环境中只允许特定域名
  return [
    'https://gowork.example.com',
    'https://www.gowork.example.com'
  ];
};

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
  
  // 获取响应
  // Get response
  const response = NextResponse.next();
  
  // 处理 CORS
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  
  // 如果请求来自允许的域名，设置相应的 CORS 头
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  return response;
}

// 配置需要应用中间件的路径
// Configure paths where middleware should be applied
export const config = {
  matcher: [
    // 匹配所有路径
    // Match all paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};