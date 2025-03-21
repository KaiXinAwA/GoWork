'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Users,
  Briefcase,
  BarChart,
  Settings,
  Home,
  Lock,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // 检查用户是否是管理员
  if (session && session.user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  // 侧边栏菜单项
  const sidebarItems = [
    {
      title: '仪表盘',
      icon: <Home className="h-5 w-5" />,
      href: '/admin',
    },
    {
      title: '用户管理',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/users',
    },
    {
      title: '职位管理',
      icon: <Briefcase className="h-5 w-5" />,
      href: '/admin/jobs',
    },
    {
      title: '数据分析',
      icon: <BarChart className="h-5 w-5" />,
      href: '/admin/analytics',
    },
    {
      title: '系统设置',
      icon: <Settings className="h-5 w-5" />,
      href: '/admin/settings',
    },
    {
      title: '安全管理',
      icon: <Lock className="h-5 w-5" />,
      href: '/admin/security',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        {/* 侧边导航栏 */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800">管理控制台</h2>
            <p className="text-sm text-gray-500">欢迎，{session?.user?.name}</p>
          </div>
          <nav className="mt-2">
            <ul>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center px-6 py-3 text-sm transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <span className={cn('mr-3', isActive ? 'text-blue-600' : 'text-gray-500')}>
                        {item.icon}
                      </span>
                      {item.title}
                      {isActive ? (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* 移动设备下的顶部导航 */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">管理控制台</h2>
            <div className="relative inline-block text-left dropdown">
              <button
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                id="menu-button"
              >
                菜单
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex overflow-x-auto space-x-2 pb-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex-shrink-0 flex items-center px-4 py-2 text-sm rounded-md whitespace-nowrap',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <span className={cn('mr-2', isActive ? 'text-blue-600' : 'text-gray-500')}>
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 主内容区域 */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 