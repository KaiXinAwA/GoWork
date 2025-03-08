"use client";

import { useEffect, useState } from "react";
import { Job, User, Category, Skill } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Define job type with relationships
interface JobWithRelations extends Job {
  employer: Pick<User, "name" | "id">;
  category: Pick<Category, "name" | "id">;
  skills: Pick<Skill, "name" | "id">[];
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center py-8">No jobs found</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{job.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{job.type}</Badge>
              <Badge variant="outline">{job.experienceLevel}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {job.companyName} • {job.location}
              </p>
              {job.salary && (
                <p className="text-sm font-medium">{job.salary}</p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {job.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {job.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Badge>{job.category.name}</Badge>
                <Link href={`/jobs/${job.id}`}>
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