import { Metadata } from "next";
import { JobSearch } from "@/components/jobs/job-search";
import JobList from "@/components/jobs/job-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse Jobs | GoWork",
  description: "Browse and search the latest job opportunities",
};

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
      <JobSearch />
      <div className="mt-8">
        <Suspense fallback={<div>Loading job listings...</div>}>
          <JobList />
        </Suspense>
      </div>
    </div>
  );
}

