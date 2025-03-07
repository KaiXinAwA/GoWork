import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'

// 使用 CSS 方式加载字体
// Load font using CSS
import "./fonts.css"

// 分离视口配置
// Separate viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 移除 maximumScale 以提高可访问性
  // Remove maximumScale to improve accessibility
  minimumScale: 1,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "GoWork - 招聘网站",
  description: "连接求职者和雇主的简单招聘平台",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" 
        />
        {/* 使用媒体查询来支持不同主题的颜色 */}
        {/* Use media queries to support different theme colors */}
        <meta 
          name="theme-color" 
          content="#ffffff" 
          media="(prefers-color-scheme: light)" 
        />
        <meta 
          name="theme-color" 
          content="#1a1a1a" 
          media="(prefers-color-scheme: dark)" 
        />
        {/* 优化字体加载 */}
        {/* Optimize font loading */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
          media="print"
        />
        <Script id="font-loader">
          {`
            document.querySelector('link[href*="Inter"]').media = 'all';
          `}
        </Script>
      </head>
      <body className="font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="gowork-theme"
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'