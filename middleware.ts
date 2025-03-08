import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 定义路径配置
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
    '/api/jobs',  // 允许公开访问职位列表 API
  ],
  employer: [
    '/employer',
    '/employer/jobs',
    '/employer/applications',
    '/api/jobs/create',
    '/api/jobs/update',
    '/api/jobs/delete',
  ],
  jobseeker: [
    '/jobseeker',
    '/jobseeker/applications',
    '/jobseeker/saved-jobs',
    '/api/applications',
  ],
  admin: [
    '/admin',
    '/admin/users',
    '/admin/jobs',
    '/admin/categories',
  ],
};

// 获取允许的域名列表
// Get allowed origins
const getAllowedOrigins = () => {
  // 在开发环境中允许本地测试
  // Allow local testing in development
  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }
  
  // 在生产环境中只允许特定域名
  // Only allow specific domains in production
  return [
    'https://gowork.example.com',
    'https://www.gowork.example.com'
  ];
};

// 检查路径是否匹配
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
  
  // 处理 CORS
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

  // 检查是否是公开路径
  // Check if it's a public path
  if (matchPath(pathname, pathConfig.public)) {
    return NextResponse.next();
  }

  // 获取用户 token
  // Get user token
  const token = await getToken({ req: request });

  // 如果没有 token，重定向到登录页
  // If no token, redirect to login
  if (!token) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    return response;
  }

  // 根据用户角色检查权限
  // Check permissions based on user role
  const userRole = token.role as string;
  
  if (userRole === 'EMPLOYER' && matchPath(pathname, pathConfig.employer)) {
    return NextResponse.next();
  }
  
  if (userRole === 'JOBSEEKER' && matchPath(pathname, pathConfig.jobseeker)) {
    return NextResponse.next();
  }
  
  if (userRole === 'ADMIN' && matchPath(pathname, pathConfig.admin)) {
    return NextResponse.next();
  }

  // 如果没有权限，重定向到首页
  // If no permission, redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}

// 配置中间件匹配路径
// Configure middleware matching paths
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};