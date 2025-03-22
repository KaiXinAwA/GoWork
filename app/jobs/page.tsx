import { Metadata } from "next";
import { JobSearch } from "@/components/jobs/job-search";
import JobList from "@/components/jobs/job-list";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse Jobs | GoWork",
  description: "Browse and search the latest job opportunities",
};

export default function JobsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Search and apply for jobs that best suit you
        </p>
      </div>
      
      <JobSearch />
      
      <Suspense fallback={<div>Loading job listings...</div>}>
        <JobList />
      </Suspense>
    </div>
  );
}

