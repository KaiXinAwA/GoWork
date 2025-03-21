import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="font-semibold mb-3">About GoWork</h3>
            <p className="text-sm text-muted-foreground">
              A simple recruitment platform connecting job seekers and employers, making job hunting easier.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="font-semibold mb-3">Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                  Create Resume
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-muted-foreground hover:text-foreground">
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="font-semibold mb-3">Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-foreground">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Recruitment Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GoWork. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

