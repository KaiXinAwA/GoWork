'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useErrorHandler } from "@/hooks/use-error-handler";

// 定义职位类型
interface Job {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
}

export function JobList() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { handleError } = useErrorHandler({
    defaultMessage: '加载职位列表失败'
  });

  // 获取职位列表
  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/jobs");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }
        
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        handleError(error);
        // 如果API调用失败，使用模拟数据作为备用
        setJobs([
          {
            id: 1,
            title: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            location: "Singapore",
            salary: "$6,000 - $8,000",
            type: "Full-time",
            description:
              "We are looking for an experienced software engineer to join our team...",
            requirements: [
              "5+ years of experience in web development",
              "Strong knowledge of React and Node.js",
              "Experience with cloud platforms (AWS/GCP)",
            ],
          },
          {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Agency",
            location: "Remote",
            salary: "$4,000 - $6,000",
            type: "Full-time",
            description:
              "Join our creative team as a UI/UX designer and help create beautiful...",
            requirements: [
              "3+ years of UI/UX design experience",
              "Proficiency in Figma and Adobe Creative Suite",
              "Strong portfolio of web and mobile designs",
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const handleQuickApply = async (jobId: string | number) => {
    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Application failed");
      }

      toast.success("申请提交成功！");
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <p className="text-center py-8">没有找到符合条件的职位</p>
      ) : (
        jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Salary:</span>
                  <span>{job.salary}</span>
                </div>
                <p className="text-sm">{job.description}</p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Requirements:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleQuickApply(job.id)} className="w-full">
                快速申请
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}