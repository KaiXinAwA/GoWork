'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToLogin() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>正在重定向到登录页面... / Redirecting to login page...</p>
    </div>
  );
} 