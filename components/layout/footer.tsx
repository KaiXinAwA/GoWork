import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p className="mb-2">© {new Date().getFullYear()} GoWork. All rights reserved.</p>
            <p>Email: bcs24090012@student.uts.edu.my</p>
          </div>
          <div>
            <Link href="/help" className="text-sm text-gray-600 hover:text-blue-600">
              Help Centre
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

