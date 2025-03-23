'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">
            GoWork
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/jobs" className="text-sm font-medium">
              Jobs
            </Link>
            <Link href="/companies" className="text-sm font-medium">
              Companies
            </Link>
            {user?.role === "ADMIN" && (
              <Link href="/admin" className="text-sm font-medium">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign up</Button>
              </Link>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => router.push('/profile')}
              >
                Profile
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

