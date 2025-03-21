'use client';

import { useTheme } from "next-themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// 定义数据类型
// Define chart data type
interface ChartData {
  name: string;
  applications: number;
  jobPosts: number;
}

// 默认数据 - 用于出错时显示
// Default data - used when API call fails
const DEFAULT_CHART_DATA: ChartData[] = [
  { name: '一月', applications: 30, jobPosts: 15 },
  { name: '二月', applications: 40, jobPosts: 20 },
  { name: '三月', applications: 45, jobPosts: 25 },
  { name: '四月', applications: 50, jobPosts: 30 },
  { name: '五月', applications: 55, jobPosts: 35 },
  { name: '六月', applications: 60, jobPosts: 40 },
];

// 获取图表数据的函数
// Function to fetch chart data
async function fetchChartData(): Promise<ChartData[]> {
  try {
    const response = await fetch('/api/dashboard/overview');
    if (!response || !response.ok) {
      throw new Error(`获取数据失败: ${response?.status || 'Network error'}`);
    }
    return response.json();
  } catch (error) {
    console.error('获取图表数据出错:', error);
    // 返回默认数据以避免完全失败
    // Return default data to avoid complete failure
    return DEFAULT_CHART_DATA;
  }
}

export function Overview() {
  const { theme } = useTheme();
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const chartData = await fetchChartData();
        if (isMounted) {
          setData(chartData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('加载图表数据失败');
          console.error('加载图表数据出错:', err);
          // 使用默认数据
          // Use default data
          setData(DEFAULT_CHART_DATA);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // 显示加载状态
  // Show loading state
  if (loading) {
    return <Skeleton className="w-full h-[350px]" data-testid="loading-skeleton" />;
  }

  // 显示错误信息
  // Show error message
  if (error && !data.length) {
    return <div className="text-destructive text-center py-4">{error}</div>;
  }

  // 渲染图表
  // Render chart
  return (
    <ResponsiveContainer width="100%" height={350} data-testid="chart-container">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke={theme === 'dark' ? '#888888' : '#1f2937'}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme === 'dark' ? '#888888' : '#1f2937'}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="applications"
          name="申请数量"
          radius={[4, 4, 0, 0]}
          fill="#4f46e5"
        />
        <Bar
          dataKey="jobPosts"
          name="职位发布"
          radius={[4, 4, 0, 0]}
          fill="#10b981"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}