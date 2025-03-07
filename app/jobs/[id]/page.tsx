import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-12">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Financial Analyst</CardTitle>
                <p className="text-muted-foreground">KaiXin Company</p>
              </div>
              <Button>QUICKLY APPLY</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Location:</span>
                <span className="ml-1">Sarawak, Sibu</span>
              </div>
              <div>
                <span className="font-medium">Salary:</span>
                <span className="ml-1">RM 1700-2000</span>
              </div>
              <div>
                <span className="font-medium">Job Type:</span>
                <span className="ml-1">Full-Time</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Responsibilities:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Extract, analyse and tally financial information from operating system.</li>
                <li>Verify bank transactions with operation system.</li>
                <li>Download bank statements and update bank balance spreadsheet.</li>
                <li>Liaise with branch staff on bank receiving.</li>
                <li>Accomplish work related activities or tasks assigned by superior as needed.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Education:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Minimum SPM.</li>
                <li>Fresh graduate is encouraged to apply.</li>
                <li>At least 1 year of related working experience.</li>
                <li>Proficiency with Microsoft Office – Word & Excel.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Competencies:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Attention to detail and ability to perform tasks with accuracy and efficiency in mind.</li>
                <li>Ability to understand and follow specific instructions and procedures.</li>
                <li>Records maintenance skills.</li>
                <li>Ability to communicate effectively, both orally and in writing.</li>
                <li>Word processing and/or data entry skills.</li>
                <li>Organizing and coordinating skills.</li>
                <li>Strong team player.</li>
              </ul>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" asChild>
                <Link href="/jobs">Back to Jobs</Link>
              </Button>
              <Button>APPLY NOW</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

