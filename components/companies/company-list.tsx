'use client';

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  openPositions: number;
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    logo: "/company-logos/tech-solutions.png",
    description: "Leading provider of innovative technology solutions...",
    industry: "Technology",
    location: "Singapore",
    openPositions: 5,
  },
  {
    id: "2",
    name: "Creative Agency",
    logo: "/company-logos/creative-agency.png",
    description: "Award-winning creative agency specializing in digital...",
    industry: "Design",
    location: "Remote",
    openPositions: 3,
  },
];

export function CompanyList() {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies(mockCompanies);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Link key={company.id} href={`/companies/${company.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="relative h-12 w-12">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-xl">{company.name}</CardTitle>
                <Badge variant="secondary">{company.industry}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {company.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{company.location}</span>
                <span className="font-medium">
                  {company.openPositions} open positions
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
} 