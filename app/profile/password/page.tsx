import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">Update Password</h1>
            </div>

            <div className="p-6">
              <form className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Old Password</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Create New Password</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>

                <div className="text-right">
                  <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">
                    FORGOT PASSWORD
                  </Link>
                </div>

                <div className="flex justify-end gap-2">
                  <Link href="/profile">
                    <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                      Cancel
                    </button>
                  </Link>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

