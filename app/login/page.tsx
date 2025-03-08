'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";

export default function RedirectToLogin() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p>Redirecting to login page...</p>
      </div>
    </div>
  );
} 