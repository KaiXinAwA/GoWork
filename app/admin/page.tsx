'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Briefcase,
  BarChart as RechartsBarChart,
  Settings,
  AlertCircle,
  Bell,
  Home,
  Lock,
} from "lucide-react";

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // 检查用户是否是管理员
  if (session && session.user.role !== "ADMIN") {
    router.push('/');
    return null;
  }

  // 管理菜单项
  const adminMenuItems = [
    {
      title: "仪表盘",
      description: "查看平台关键指标",
      icon: <Home className="h-5 w-5" />,
      href: "/admin",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "用户管理",
      description: "管理平台所有用户",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "职位管理",
      description: "管理职位发布和申请",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/admin/jobs",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "数据分析",
      description: "查看详细的数据报告",
      icon: <RechartsBarChart className="h-5 w-5" />,
      href: "/admin/analytics",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "系统设置",
      description: "配置平台参数",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
    },
    {
      title: "安全管理",
      description: "管理权限和安全设置",
      icon: <Lock className="h-5 w-5" />,
      href: "/admin/security",
      color: "text-red-500",
      bgColor: "bg-red-50",
    }
  ];

  // 平台统计数据
  const platformStats = [
    {
      title: "总用户数",
      value: "108",
      change: "+12%",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: "总职位数",
      value: "45",
      change: "+15%",
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "总申请数",
      value: "178",
      change: "+23%",
      icon: <RechartsBarChart className="h-5 w-5" />,
      color: "text-yellow-500",
    }
  ];

  // 系统通知
  const systemNotifications = [
    {
      title: "系统更新",
      message: "系统将于今晚22:00-23:00进行例行维护，期间可能无法访问。",
      time: "2小时前",
      type: "info",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: "安全警告",
      message: "检测到多次失败的登录尝试，请检查系统日志。",
      time: "昨天",
      type: "warning",
      icon: <AlertCircle className="h-5 w-5" />,
    }
  ];

  // 最近活动
  const recentActivities = [
    {
      user: "张三",
      action: "发布了新职位",
      target: "高级前端开发工程师",
      time: "10分钟前",
    },
    {
      user: "李四",
      action: "申请了职位",
      target: "产品经理",
      time: "30分钟前",
    },
    {
      user: "王五",
      action: "更新了个人资料",
      target: "",
      time: "1小时前",
    },
    {
      user: "赵六",
      action: "删除了职位",
      target: "市场营销专员",
      time: "2小时前",
    },
    {
      user: "钱七",
      action: "注册了新账户",
      target: "",
      time: "3小时前",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold">管理员仪表盘</h1>
              <p className="text-gray-500 mt-1">欢迎回来，管理员{session?.user?.name}</p>
            </div>

            {/* 管理菜单 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminMenuItems.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center p-6">
                      <div className={`${item.bgColor} p-3 rounded-full ${item.color} mr-4`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 统计卡片 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>平台统计</CardTitle>
                  <CardDescription>平台主要指标统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {platformStats.map((stat, index) => (
                      <div key={index} className="flex flex-col p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">{stat.title}</span>
                          <div className={`${stat.color}`}>
                            {stat.icon}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <span className="text-2xl font-bold">{stat.value}</span>
                          <span className="text-xs text-green-500 ml-2">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 系统通知 */}
              <Card>
                <CardHeader>
                  <CardTitle>系统通知</CardTitle>
                  <CardDescription>重要通知和警告</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemNotifications.map((notification, index) => (
                      <div key={index} className="flex p-3 border rounded-lg">
                        <div className={`${
                          notification.type === "warning" ? "text-yellow-500" : "text-blue-500"
                        } mr-3`}>
                          {notification.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-gray-500 my-1">{notification.message}</p>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最近活动 */}
            <Card>
              <CardHeader>
                <CardTitle>最近活动</CardTitle>
                <CardDescription>平台用户的最新活动</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-gray-500 mx-1">{activity.action}</span>
                        {activity.target && (
                          <span className="text-blue-500">{activity.target}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 