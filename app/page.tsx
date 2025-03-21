import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">GoWork</span>
              <span className="chinese block mt-2">欢迎来到 GoWork</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A Simple Job Platform Connecting Job Seekers and Employers
              <span className="chinese block mt-1">连接求职者和雇主的简单招聘平台</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="p-8 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Automatically match the most suitable positions based on skills and experience
                  <span className="chinese block mt-1">基于技能和经验自动匹配最适合的职位</span>
                </p>
              </div>
              <div className="p-8 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Get timely notifications about application progress and new job postings
                  <span className="chinese block mt-1">及时获取申请进展和新职位发布提醒</span>
                </p>
              </div>
              <div className="p-8 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">User-Friendly</h3>
                <p className="text-muted-foreground">
                  Clear interface design makes job searching and hiring effortless
                  <span className="chinese block mt-1">清晰的界面设计，让求职招聘变得轻松</span>
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

