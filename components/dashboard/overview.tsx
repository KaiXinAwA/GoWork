'use client';

import { useTheme } from "next-themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// Define data type
interface ChartData {
  name: string;
  applications: number;
  jobPosts: number;
}

// Function to fetch chart data
async function fetchChartData(): Promise<ChartData[]> {
  try {
    const response = await fetch('/api/dashboard/overview');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching chart data:', error);
    // Return default data to avoid complete failure
    return [
      { name: 'January', applications: 30, jobPosts: 15 },
      { name: 'February', applications: 40, jobPosts: 20 },
      { name: 'March', applications: 45, jobPosts: 25 },
      { name: 'April', applications: 50, jobPosts: 30 },
      { name: 'May', applications: 55, jobPosts: 35 },
      { name: 'June', applications: 60, jobPosts: 40 },
    ];
  }
}

export function Overview() {
  const { theme } = useTheme();
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const chartData = await fetchChartData();
        setData(chartData);
        setError(null);
      } catch (err) {
        setError('Failed to load chart data');
        console.error('Error loading chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Show loading state
  if (loading) {
    return <Skeleton className="w-full h-[350px]" data-testid="loading-skeleton" />;
  }

  // Show error message
  if (error) {
    return <div className="text-destructive text-center py-4">{error}</div>;
  }

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
        <Bar
          dataKey="applications"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          name="Applications"
        />
        <Bar
          dataKey="jobPosts"
          radius={[4, 4, 0, 0]}
          className="fill-secondary"
          name="Job Posts"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}