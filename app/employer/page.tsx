import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function EmployerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold">company profile</h1>
                <div className="flex gap-2">
                  <Link href="/employer/update">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      UPDATE COMPANY PROFILE
                    </button>
                  </Link>
                  <Link href="/employer/password">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      UPDATE PASSWORD
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">POSITION:</p>
                  <p className="font-medium">Programmer</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">COMPANY:</p>
                  <p className="font-medium">KaiXin Company</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">REQUEST:</p>
                <p className="font-medium">Smart and honest, 1700k-2000k+</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">LOCATION:</p>
                  <p className="font-medium">Sarawak, Sibu</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">CONTACT NUMBER:</p>
                  <p className="font-medium">123 456 7890</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">Upload license</p>
                <div className="mt-2">
                  <div className="bg-green-100 inline-block px-3 py-1 rounded-md text-green-800 text-sm mb-2">
                    Status: Successful
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 px-3 py-1 rounded text-sm">[license.pdf]</div>
                    <button className="text-blue-600 text-sm hover:underline">View</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Link href="/employer/jobs">
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                    View Posted Jobs
                  </button>
                </Link>
                <Link href="/employer/post-job">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Post New Job</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

