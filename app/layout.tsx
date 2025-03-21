import type React from "react"
import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { Providers } from '@/components/providers'
import "./globals.css"
import "./fonts.css"

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
          precedence="default"
        />
        <Script id="font-loader">
          {`
            document.querySelector('link[href*="Inter"]').media = 'all';
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}