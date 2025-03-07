'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-primary text-2xl">
          GoWork
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  {user.name}'s Profile
                </Button>
              </Link>
              
              {user.role === 'EMPLOYER' && (
                <Link href="/employer">
                  <Button variant="ghost" size="sm">
                    Employer Dashboard
                  </Button>
                </Link>
              )}
              
              <Link href="/jobs">
                <Button variant="ghost" size="sm">
                  Browse Jobs
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" size="sm">
                  Register
                </Button>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  About Us
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="ghost" size="sm">
                  Browse Jobs
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

