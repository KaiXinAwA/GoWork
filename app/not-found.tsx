'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, the page you are looking for does not exist.
          <br />
          <span className="chinese">页面未找到</span>
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
} 