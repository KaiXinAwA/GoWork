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

// Mock data - replace with real API call
const jobs = [
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
  // Add more jobs as needed
];

export function JobList() {
  const handleQuickApply = async (jobId: number) => {
    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Application failed");
      }

      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
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
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {}}>
              View Details
            </Button>
            <Button onClick={() => handleQuickApply(job.id)}>
              Quick Apply
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}