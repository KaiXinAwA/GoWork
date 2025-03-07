import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">About Us</h1>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <p className="text-lg font-medium mb-4">" Simplifying Job Searches for Everyone."</p>
                <h2 className="text-lg font-bold mb-2">Mission Statement:</h2>
                <p className="text-sm mb-4">
                  "At GoWork, our mission is to make job searching and hiring effortless. We believe everyone deserves
                  access to opportunities, whether you're a student looking for an internship or an employer searching
                  for the perfect candidate. Our platform is designed to simplify the process, saving time and energy
                  for both job seekers and employers."
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">Who We Are</h2>
                <p className="text-sm mb-4">
                  "GoWork was founded by a team of passionate developers and career advisors who saw the challenges
                  students and small businesses face in the job market. We're dedicated to creating a platform that's
                  easy to use, affordable, and effective."
                </p>

                <h2 className="text-lg font-bold mb-2">What We Do</h2>
                <p className="text-sm mb-4">
                  "GoWork is a user-friendly job portal that connects job seekers with employers. Our platform allows
                  students and professionals to upload their resumes and apply for jobs with just one click. Employers
                  can post job openings, review applications, and find the right talent—all in one place."
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-2">Why Choose GoWork</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>
                    <span className="font-medium">Simple & Fast:</span> No complicated forms or lengthy processes.
                  </li>
                  <li>
                    <span className="font-medium">Affordable:</span> Low-cost solutions for students and small
                    businesses.
                  </li>
                  <li>
                    <span className="font-medium">Focused on You:</span> Designed with the needs of students and
                    employers in mind.
                  </li>
                  <li>
                    <span className="font-medium">Reliable:</span> Built on secure, easy-to-use technology.
                  </li>
                </ul>
                <p className="text-sm italic">
                  "Ready to find your next opportunity or hire the perfect candidate? Join GoWork today and experience
                  the future of job searching and hiring!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

