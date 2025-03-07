import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">Help Centre</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-gray-100 p-4 md:p-6">
                <ul className="space-y-2">
                  <li>
                    <Link href="#getting-started" className="block p-2 hover:bg-gray-200 rounded">
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link href="#account" className="block p-2 hover:bg-gray-200 rounded">
                      Account Management
                    </Link>
                  </li>
                  <li>
                    <Link href="#employer" className="block p-2 hover:bg-gray-200 rounded">
                      Employer Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#job-search" className="block p-2 hover:bg-gray-200 rounded">
                      Job Search & Application
                    </Link>
                  </li>
                  <li>
                    <Link href="#troubleshooting" className="block p-2 hover:bg-gray-200 rounded">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link href="#faqs" className="block p-2 hover:bg-gray-200 rounded">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="block p-2 hover:bg-gray-200 rounded">
                      Contact Support
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-4 md:p-6 md:col-span-2">
                <section id="getting-started" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Getting Started</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. How to Create an Account:</h3>
                    <p className="text-sm mb-2">
                      "To get started, click the 'Create Account' button on the homepage. Enter your user name and
                      email, create a password, and you're ready to go!"
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. Uploading Your Resume:</h3>
                    <p className="text-sm">
                      "After logging in, click 'User Profile' and click 'Update User Profile.' Then, click 'Update
                      Resume.' Choose a PDF or Word file, and your resume will be saved for future applications."
                    </p>
                  </div>
                </section>

                <section id="account" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Account Management</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. Resetting Your Password:</h3>
                    <p className="text-sm mb-2">
                      "If you forget your password, click 'Forgot Password' on the login page. Enter your email, and
                      we'll send you a link to reset it."
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. Updating Your Profile:</h3>
                    <p className="text-sm">
                      "To update your profile, click 'User Profile' then 'Update User Profile.' You can change your
                      information or upload a new resume."
                    </p>
                  </div>
                </section>

                <section id="job-search" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Job Search & Application</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. Searching for Jobs:</h3>
                    <p className="text-sm mb-2">
                      "Use the search bar on the homepage to find jobs by keyword or location. You can also filter
                      results by job type (e.g., internship, part-time)."
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. Applying for Jobs:</h3>
                    <p className="text-sm">
                      "When you find a job you like, click 'Apply.' Your uploaded resume will be sent directly to the
                      employer."
                    </p>
                  </div>
                </section>

                <section id="employer" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Employer Features</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. Posting a Job:</h3>
                    <p className="text-sm mb-2">
                      "Employers can post jobs by logging in and clicking 'Post a Job.' Fill out the form with job
                      details, and your posting will go live immediately."
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. Reviewing Applications:</h3>
                    <p className="text-sm">
                      "To view applications, log in and go to your dashboard. You'll see a list of candidates who
                      applied, along with their resumes."
                    </p>
                  </div>
                </section>

                <section id="troubleshooting" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Troubleshooting</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. File Upload Issues:</h3>
                    <p className="text-sm mb-2">
                      "If you're having trouble uploading your resume, make sure it's in PDF or Word format and under
                      5MB."
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. Email Not Received:</h3>
                    <p className="text-sm">
                      "Check your spam folder if you don't see our emails. If the issue persists, contact support."
                    </p>
                  </div>
                </section>

                <section id="faqs" className="mb-8">
                  <h2 className="text-lg font-bold mb-4">FAQs</h2>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">1. Is GoWork free for students?</h3>
                    <p className="text-sm mb-2">"Yes, GoWork is completely free for students to use."</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">2. How do employers contact candidates?</h3>
                    <p className="text-sm">
                      "Employers can reach out to candidates directly via the contact information provided in their
                      resumes."
                    </p>
                  </div>
                </section>

                <section id="contact">
                  <h2 className="text-lg font-bold mb-4">Contact Support</h2>
                  <p className="text-sm mb-4">Need More Help?</p>
                  <p className="text-sm mb-4">
                    "If you can't find the answer you're looking for: email to bcs24090012@student.uts.edu.my. We're
                    here to help!"
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Contact Support
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

