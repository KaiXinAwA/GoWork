'use client';

import * as React from "react";
import { useEffect, useState } from "react";
import { Job } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

// Define job type with relationships
interface JobWithRelations extends Job {
  company: {
    company_name: string;
    companyid: number;
  };
  applications: any[];
}

export default function JobList() {
  // State for jobs
  const [jobs, setJobs] = useState<JobWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response || !response.ok) {
          throw new Error(`HTTP error! status: ${response?.status || 'Network error'}`);
        }
        const data = await response.json();
        setJobs(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Error loading jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div data-testid="loading-skeleton" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <Skeleton className="h-6 w-full" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex flex-wrap gap-1 mt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div className="text-center py-8">No jobs found</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.jobid} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{job.position}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{job.typesofwork}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {job.company.company_name}
              </p>
              {job.salaryrange && (
                <p className="text-sm font-medium">{job.salaryrange}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {job.requirements}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link href={`/jobs/${job.jobid}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}