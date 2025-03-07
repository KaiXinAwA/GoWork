'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1>Something went wrong!</h1>
        <p className="text-muted-foreground">
          Sorry, something went wrong. Please try again later.
          <br />
          <span className="chinese">发生错误，请稍后重试</span>
        </p>
        <Button onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
} 