import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ThemeProvider } from '@/providers/ThemeProvider'
import '@/styles/index.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex-1 w-full flex flex-col">
            {/* Top Bar for Auth Flows */}
            <header className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto">
              <Link href="/" className="flex items-center gap-2 group">
                <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Back to Home
                </span>
              </Link>
              <div className="font-bold text-xl tracking-tight">EtherHub</div>
            </header>

            {/* Main Content (Centered) */}
            <main className="flex-1 flex flex-col justify-center pb-12">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
