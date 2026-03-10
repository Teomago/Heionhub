'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CreditCard,
  NotebookTabs,
  PieChart,
  BarChart3,
  Calendar,
  FileDown,
  Menu,
  PanelLeftClose,
} from 'lucide-react'
import { SidebarLogout } from '@/app/app/components/SidebarLogout'
import { Button } from '@/components/buttons/Button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsOpen(false)
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen w-full bg-neutral-50 dark:bg-neutral-900">
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
          <div className="mb-5 flex items-center justify-between ps-2.5">
            <Link href="/app" className="flex items-center">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Finance App
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-10 w-10 p-0 text-muted-foreground hover:bg-muted sm:hidden"
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/app"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname === '/app' ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <LayoutDashboard className="h-5 w-5 opacity-75" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/accounts"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/accounts') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <CreditCard className="h-5 w-5 opacity-75" />
                <span className="ms-3">Accounts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/transactions"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/transactions') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <NotebookTabs className="h-5 w-5 opacity-75" />
                <span className="ms-3">Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/budget"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/budget') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <PieChart className="h-5 w-5 opacity-75" />
                <span className="ms-3">Budget</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/scheduled-transactions"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/scheduled-transactions') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <Calendar className="h-5 w-5 opacity-75" />
                <span className="ms-3">Scheduled</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/reports"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/reports') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <BarChart3 className="h-5 w-5 opacity-75" />
                <span className="ms-3">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/import"
                className={`group flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname.includes('/import') ? 'bg-neutral-100 dark:bg-neutral-800 text-primary' : 'text-neutral-900 dark:text-white'}`}
              >
                <FileDown className="h-5 w-5 opacity-75" />
                <span className="ms-3">Import CSV</span>
              </Link>
            </li>
          </ul>
          <div className="mt-auto pt-4 border-t flex items-center justify-center">
            <SidebarLogout />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isOpen ? 'sm:ml-64' : 'ml-0'
        }`}
      >
        {/* Top Header with toggle button */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 h-10 w-10 p-0"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <span className="font-semibold text-lg tracking-tight">EtherHub</span>
            <ThemeToggle />
          </div>
        </header>

        {/* Child Pages Wrapper */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
