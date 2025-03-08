import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CompanyList } from "@/components/companies/company-list";

export const metadata: Metadata = {
  title: "Companies | GoWork",
  description: "Browse companies hiring on GoWork",
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Companies</h1>
            <p className="text-muted-foreground mt-2">
              Discover great companies that are hiring now
            </p>
          </div>
          <CompanyList />
        </div>
      </main>
      <Footer />
    </div>
  );
} 