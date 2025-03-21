'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useSession } from "next-auth/react"

export default function Header() {
  // 移除未使用的 user 变量
  const { } = useAuth() 
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  // 主题切换函数
  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
            {session?.user?.role === "ADMIN" && (
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme toggle button | 主题切换按钮 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {!session ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          ) : (
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

