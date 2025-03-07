import { Metadata } from "next";
import { JobPostForm } from "@/components/employer/job-post-form";

export const metadata: Metadata = {
  title: "Post a Job",
  description: "Create a new job posting",
};

export default function PostJobPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-muted-foreground">
            Fill out the form below to create a new job posting
          </p>
        </div>
        <JobPostForm />
      </div>
    </div>
  );
}

