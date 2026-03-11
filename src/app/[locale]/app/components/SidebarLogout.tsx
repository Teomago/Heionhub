'use client'

import { LogOut } from 'lucide-react'
import { logout } from '@/app/[locale]/app/actions/auth'

export function SidebarLogout() {
  return (
    <button
      onClick={() => logout()}
      className="group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    >
      <LogOut className="h-5 w-5" />
      <span className="ms-3">Exit</span>
    </button>
  )
}
