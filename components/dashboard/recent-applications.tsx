'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentApplications = [
  {
    company: "Google",
    role: "Senior Software Engineer",
    status: "Under Review",
    date: "2024-03-06",
    logo: "/company-logos/google.png",
  },
  {
    company: "Microsoft",
    role: "Full Stack Developer",
    status: "Interview Scheduled",
    date: "2024-03-05",
    logo: "/company-logos/microsoft.png",
  },
  {
    company: "Amazon",
    role: "Cloud Solutions Architect",
    status: "Application Sent",
    date: "2024-03-04",
    logo: "/company-logos/amazon.png",
  },
  {
    company: "Meta",
    role: "Product Manager",
    status: "Under Review",
    date: "2024-03-03",
    logo: "/company-logos/meta.png",
  },
  {
    company: "Apple",
    role: "iOS Developer",
    status: "Interview Scheduled",
    date: "2024-03-02",
    logo: "/company-logos/apple.png",
  },
];

export function RecentApplications() {
  return (
    <div className="space-y-8">
      {recentApplications.map((application) => (
        <div key={application.company} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={application.logo} alt={application.company} />
            <AvatarFallback>{application.company[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.role}</p>
            <p className="text-sm text-muted-foreground">
              {application.company}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <span className={`text-sm ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Under Review":
      return "text-yellow-500";
    case "Interview Scheduled":
      return "text-green-500";
    case "Application Sent":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
} 