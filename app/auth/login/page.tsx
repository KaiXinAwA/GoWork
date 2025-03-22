'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // Redirect to home page if user is already logged in
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Login to your account to continue
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account? <Link href="/auth/register" className="text-primary hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}