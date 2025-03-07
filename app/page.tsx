import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold mb-4">
              Find high-quality talent or open jobs with the help of AI tools that keep you in control.
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Thousands of amazing opportunities are waiting for you—don't miss out!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <p className="font-medium">Stand out to top employers and land the job you deserve!</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <p className="font-medium">Your dream job is just a click away—start your journey now!</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <p className="font-medium">Find the perfect candidate with our powerful tools.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">For Job Seekers</h2>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Create a professional profile that stands out</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Apply to jobs with just one click</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Filter jobs by location, salary, and type</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Get matched with positions that fit your skills</span>
                </li>
              </ul>
              <Link
                href="/login"
                className="block text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Find Jobs
              </Link>
            </div>

            <div className="bg-white p-8 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">For Employers</h2>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Post job openings quickly and easily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Review qualified applicants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Build your company profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Connect with the best talent</span>
                </li>
              </ul>
              <Link
                href="/employer"
                className="block text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

