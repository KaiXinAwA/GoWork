'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Session } from 'next-auth'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'
import React from 'react'
import { AuthProvider } from '@/lib/auth-context'

// 错误回退组件，显示友好的错误信息并提供重试功能
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">出错了 | An Error Occurred</h2>
        <p className="text-sm text-gray-500 mb-4">{error.message || '应用程序中发生未知错误 | An unknown error occurred in the application'}</p>
        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          className="mt-2"
        >
          重试 | Retry
        </Button>
      </div>
    </div>
  )
}

// 应用程序提供者组件，包装全局状态和主题
export function Providers({
  children,
  session
}: {
  children: React.ReactNode
  session: Session | null
}): JSX.Element {
  // 记录错误到控制台或错误跟踪服务
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error('Application error:', error);
    console.error('Component stack:', info.componentStack);
  };

  const handleReset = () => {
    // 当用户点击重试按钮时执行的操作
    console.log('User requested error boundary reset');
  };

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="gowork-theme"
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </SessionProvider>
    </ErrorBoundary>
  )
}