'use client'

import * as React from 'react'
import { CreditCard, Home } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Sample data structure for the sidebar
// In production, user data would come from props/context
const data = {
  user: {
    name: 'Mateo Ibagon', // Placeholder, will be replaced by dynamic data
    email: 'mateo@eterhub.com',
    avatar: '',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: false,
      items: [],
    },
    {
      title: 'Financial',
      url: '/dashboard/financial',
      icon: CreditCard,
      isActive: true,
      items: [
        {
          title: 'Records',
          url: '/dashboard/financial/records',
        },
        {
          title: 'Tags',
          url: '/dashboard/tags',
        },
        {
          title: 'Income',
          url: '/dashboard/financial/income',
        },
        {
          title: 'Expenses',
          url: '/dashboard/financial/expenses',
        },
        {
          title: 'Savings',
          url: '/dashboard/financial/savings',
        },
      ],
    },
  ],
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: { firstName?: string; lastName?: string; email?: string } | null }) {
  // Use passed user or fallback (though auth check ensures user exists)
  const userData = {
    name: user?.firstName ? `${user.firstName} ${user.lastName}` : 'Member',
    email: user?.email || '',
    avatar: '', // TODO: Handle avatar
  }

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r border-white/10" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-2 py-1">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                E
              </div>
              <span className="group-data-[collapsible=icon]:hidden">Eterhub</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
