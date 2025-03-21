'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

interface JobDetail {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${params.id}`);
        
        if (!response.ok) {
          throw new Error(`获取职位详情失败: ${response.status}`);
        }
        
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('无法加载职位详情');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto py-12">
          <Skeleton className="w-full h-[500px] rounded-lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto py-12">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">出错了</h2>
            <p className="text-muted-foreground">{error || '找不到该职位'}</p>
            <Link href="/jobs">
              <Button className="mt-4">返回职位列表</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 渲染实际职位数据
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-12">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <p className="text-muted-foreground">{job.companyName}</p>
              </div>
              <Button>立即申请</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">地点:</span>
                <span className="ml-1">{job.location}</span>
              </div>
              <div>
                <span className="font-medium">薪资:</span>
                <span className="ml-1">{job.salary}</span>
              </div>
              <div>
                <span className="font-medium">工作类型:</span>
                <span className="ml-1">{job.type}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">职位描述:</h3>
              <div className="whitespace-pre-line">{job.description}</div>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">要求:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

