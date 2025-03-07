import { Metadata } from "next";
import { JobSearch } from "@/components/jobs/job-search";
import { JobList } from "@/components/jobs/job-list";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Find your next opportunity",
};

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Find Jobs</h1>
          <p className="text-muted-foreground">
            Search and apply for the latest jobs
          </p>
        </div>
        <JobSearch />
        <JobList />
      </div>
    </div>
  );
}

