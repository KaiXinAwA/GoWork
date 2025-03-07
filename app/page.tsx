import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 md:p-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">GoWork</span>
              <span className="chinese block mt-2">欢迎来到 GoWork</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A Simple Job Platform Connecting Job Seekers and Employers
              <span className="chinese block mt-1">连接求职者和雇主的简单招聘平台</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Automatically match the most suitable positions based on skills and experience
                <span className="chinese block mt-1">基于技能和经验自动匹配最适合的职位</span>
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get timely notifications about application progress and new job postings
                <span className="chinese block mt-1">及时获取申请进展和新职位发布提醒</span>
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">User-Friendly</h3>
              <p className="text-muted-foreground">
                Clear interface design makes job searching and hiring effortless
                <span className="chinese block mt-1">清晰的界面设计，让求职招聘变得轻松</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

