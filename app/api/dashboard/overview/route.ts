import { NextResponse } from 'next/server';

// 模拟仪表盘数据
export async function GET() {
  // 创建一些示例数据
  const chartData = [
    { name: '一月', 应聘人数: 65, 职位发布: 28 },
    { name: '二月', 应聘人数: 59, 职位发布: 48 },
    { name: '三月', 应聘人数: 80, 职位发布: 40 },
    { name: '四月', 应聘人数: 81, 职位发布: 19 },
    { name: '五月', 应聘人数: 56, 职位发布: 96 },
    { name: '六月', 应聘人数: 55, 职位发布: 27 },
    { name: '七月', 应聘人数: 40, 职位发布: 32 },
  ];

  return NextResponse.json(chartData);
}