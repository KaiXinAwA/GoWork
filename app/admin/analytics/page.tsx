'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Download, AreaChart, Users, Briefcase, Calendar } from "lucide-react";

// 定义数据类型接口
interface ChartDataItem {
  date?: string;
  hour?: string;
  value: number;
}

interface PieChartData {
  labels: string[];
  values: number[];
}

// 模拟图表数据
const userRegistrationData: ChartDataItem[] = [
  { date: '2023-10-01', value: 12 },
  { date: '2023-11-01', value: 18 },
  { date: '2023-12-01', value: 25 },
  { date: '2024-01-01', value: 31 },
  { date: '2024-02-01', value: 42 },
  { date: '2024-03-01', value: 58 },
];

const jobPostingData: ChartDataItem[] = [
  { date: '2023-10-01', value: 8 },
  { date: '2023-11-01', value: 13 },
  { date: '2023-12-01', value: 17 },
  { date: '2024-01-01', value: 22 },
  { date: '2024-02-01', value: 35 },
  { date: '2024-03-01', value: 45 },
];

const jobApplicationData: ChartDataItem[] = [
  { date: '2023-10-01', value: 35 },
  { date: '2023-11-01', value: 48 },
  { date: '2023-12-01', value: 67 },
  { date: '2024-01-01', value: 89 },
  { date: '2024-02-01', value: 125 },
  { date: '2024-03-01', value: 178 },
];

// 用户类型分布
const userTypeDistribution: PieChartData = {
  labels: ['求职者', '招聘者', '管理员'],
  values: [65, 30, 5],
};

// 地区分布
const locationDistribution: PieChartData = {
  labels: ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德', '其他'],
  values: [40, 25, 15, 10, 5, 5],
};

// 行业分布
const industryDistribution: PieChartData = {
  labels: ['科技', '金融', '教育', '医疗', '零售', '制造', '其他'],
  values: [30, 20, 15, 10, 10, 10, 5],
};

// 不同时间段的数据
const hourlyActivityData: ChartDataItem[] = [
  { hour: '0:00', value: 5 },
  { hour: '1:00', value: 3 },
  { hour: '2:00', value: 2 },
  { hour: '3:00', value: 1 },
  { hour: '4:00', value: 1 },
  { hour: '5:00', value: 2 },
  { hour: '6:00', value: 5 },
  { hour: '7:00', value: 10 },
  { hour: '8:00', value: 25 },
  { hour: '9:00', value: 45 },
  { hour: '10:00', value: 60 },
  { hour: '11:00', value: 65 },
  { hour: '12:00', value: 70 },
  { hour: '13:00', value: 68 },
  { hour: '14:00', value: 65 },
  { hour: '15:00', value: 60 },
  { hour: '16:00', value: 55 },
  { hour: '17:00', value: 50 },
  { hour: '18:00', value: 40 },
  { hour: '19:00', value: 30 },
  { hour: '20:00', value: 25 },
  { hour: '21:00', value: 20 },
  { hour: '22:00', value: 15 },
  { hour: '23:00', value: 10 }
];

export default function AdminAnalyticsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [dateRange, setDateRange] = useState('6m');
  const [chartType, setChartType] = useState('users');

  // 检查用户是否是管理员
  if (session && session.user.role !== "ADMIN") {
    router.push('/');
    return null;
  }

  // 根据所选时间范围过滤数据
  const getFilteredData = (data: ChartDataItem[], range: string) => {
    if (range === 'all') return data;
    
    const now = new Date();
    let cutoffDate;
    
    switch (range) {
      case '1m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case '1y':
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return data;
    }
    
    return data.filter(item => new Date(item.date || '') >= cutoffDate);
  };

  // 获取当前图表数据
  const getCurrentChartData = () => {
    switch (chartType) {
      case 'users':
        return getFilteredData(userRegistrationData, dateRange);
      case 'jobs':
        return getFilteredData(jobPostingData, dateRange);
      case 'applications':
        return getFilteredData(jobApplicationData, dateRange);
      default:
        return [];
    }
  };

  // 计算指标
  const calculateMetrics = () => {
    // 用户总数
    const totalUsers = userTypeDistribution.values.reduce((a, b) => a + b, 0);
    
    // 职位总数
    const totalJobs = jobPostingData[jobPostingData.length - 1].value;
    
    // 申请总数
    const totalApplications = jobApplicationData[jobApplicationData.length - 1].value;
    
    // 活跃度（假设活跃度是指最近一个月的各类活动总和）
    const recentUserActivity = userRegistrationData[userRegistrationData.length - 1].value;
    const recentJobActivity = jobPostingData[jobPostingData.length - 1].value;
    const recentApplicationActivity = jobApplicationData[jobApplicationData.length - 1].value;
    const activityLevel = recentUserActivity + recentJobActivity + recentApplicationActivity;
    
    return {
      totalUsers,
      totalJobs,
      totalApplications,
      activityLevel
    };
  };

  const metrics = calculateMetrics();

  // 生成模拟的折线图组件
  const ChartComponent = ({ data, title }: { data: ChartDataItem[], title: string }) => {
    // 计算图表的最大值以便设置高度
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="w-full h-[300px] relative">
          {/* 模拟折线图 */}
          <div className="absolute inset-0 flex items-end">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div 
                  className="w-full bg-blue-500 opacity-80 rounded-t-sm mx-0.5"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
                  {item.date ? item.date.split('-')[1] + '/' + item.date.split('-')[0].slice(2) : item.hour}
                </span>
              </div>
            ))}
          </div>
          
          {/* Y轴刻度 */}
          <div className="absolute left-0 inset-y-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">
                  {Math.round(maxValue * (4 - i) / 4)}
                </span>
                <div className="border-b border-gray-200 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 生成饼图组件
  const PieChartComponent = ({ data, title }: { data: PieChartData, title: string }) => {
    const total = data.values.reduce((a: number, b: number) => a + b, 0);
    
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="flex">
          <div className="w-[150px] h-[150px] relative">
            {/* 简化的饼图，用彩色的div表示 */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {data.values.map((value, index) => {
                const percentage = (value / total) * 100;
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
                
                return (
                  <div 
                    key={index}
                    className={`absolute ${colors[index % colors.length]}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(2 * Math.PI * (percentage / 100))}% ${50 - 50 * Math.sin(2 * Math.PI * (percentage / 100))}%, 50% 0)`
                    }}
                  ></div>
                );
              })}
              <div className="absolute inset-[30%] bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">{total}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-col justify-center">
            {data.labels.map((label, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
              const percentage = Math.round((data.values[index] / total) * 100);
              
              return (
                <div key={index} className="flex items-center mb-2">
                  <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-sm mr-2`}></div>
                  <span className="text-xs">{label}: {percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">数据分析</h1>
                <p className="text-gray-500 mt-1">查看和分析平台性能指标</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> 导出报告
                </Button>
              </div>
            </div>

            {/* 关键指标卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">用户总数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="text-2xl font-bold">{metrics.totalUsers}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">较上月增长 12%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">职位总数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-2xl font-bold">{metrics.totalJobs}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">较上月增长 15%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">申请总数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AreaChart className="h-5 w-5 text-yellow-500 mr-2" />
                    <div className="text-2xl font-bold">{metrics.totalApplications}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">较上月增长 23%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">平台活跃度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <div className="text-2xl font-bold">{metrics.activityLevel}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">较上月增长 18%</p>
                </CardContent>
              </Card>
            </div>

            {/* 趋势图表 */}
            <Card>
              <CardHeader>
                <CardTitle>趋势分析</CardTitle>
                <CardDescription>查看平台关键指标的增长趋势</CardDescription>
                <div className="flex justify-between items-center mt-4">
                  <Tabs value={chartType} onValueChange={setChartType}>
                    <TabsList>
                      <TabsTrigger value="users">用户注册</TabsTrigger>
                      <TabsTrigger value="jobs">职位发布</TabsTrigger>
                      <TabsTrigger value="applications">职位申请</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="选择时间范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">最近1个月</SelectItem>
                      <SelectItem value="3m">最近3个月</SelectItem>
                      <SelectItem value="6m">最近6个月</SelectItem>
                      <SelectItem value="1y">最近1年</SelectItem>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ChartComponent 
                  data={getCurrentChartData()} 
                  title={
                    chartType === 'users' ? '月度用户注册量' : 
                    chartType === 'jobs' ? '月度职位发布量' : '月度职位申请量'
                  } 
                />
              </CardContent>
            </Card>

            {/* 分布分析 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>用户类型分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChartComponent data={userTypeDistribution} title="用户类型占比" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>地区分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChartComponent data={locationDistribution} title="用户地区分布" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>行业分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChartComponent data={industryDistribution} title="职位行业分布" />
                </CardContent>
              </Card>
            </div>

            {/* 用户活跃时间分析 */}
            <Card>
              <CardHeader>
                <CardTitle>用户活跃时间</CardTitle>
                <CardDescription>24小时用户活跃度分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent data={hourlyActivityData} title="每小时活跃用户数" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 