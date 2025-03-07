import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold">User Profile</h1>
                <div className="flex gap-2">
                  <Link href="/profile/update">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      UPDATE USER PROFILE
                    </button>
                  </Link>
                  <Link href="/profile/password">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      UPDATE PASSWORD
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">USERNAME :</p>
                    <p className="font-medium">KaiXin</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">EMAIL :</p>
                    <p className="font-medium">KaiXin3111@gmail.com</p>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">USERID :</p>
                    <p className="font-medium">KaiXin3111</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">RESUME :</p>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-100 px-3 py-1 rounded text-sm">[resume.pdf]</div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">EDUCATION :</p>
                <p className="font-medium">University</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">LANGUAGE :</p>
                <p className="font-medium">Chinese, English, Bahasa Melayu</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

