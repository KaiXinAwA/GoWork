'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  // 主题切换函数
  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl">
          GoWork
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
            职位列表
          </Link>
          <Link href="/companies" className="text-muted-foreground hover:text-foreground">
            公司
          </Link>
          {user && (
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              控制台
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* 主题切换按钮 */}
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-10 w-10"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>

          {user ? (
            <Link href="/profile">
              <Button variant="outline" size="sm">
                个人中心
              </Button>
            </Link>
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  登录
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  注册
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

