import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) {
    redirect('/login')
  }

  // Verify token is valid and belongs to a Member
  const { user: _user } = await payload.auth({ headers: await headers() })

  // NOTE: payload.auth() uses the standard 'payload-token' or looks for headers.
  // Since we are setting a CUSTOM cookie 'payload-member-token',
  // payload.auth() might not find it automatically unless we manually pass it as Authorization header
  // OR we rely on our manual verify.

  // Let's verify manually using 'me' operation which is safer or just trust the token presence + verify
  // Actually, payload.auth() is best. We should probably stick to standard cookies if possible or:

  // Revised approach:
  // If we want to use 'payload-member-token', we must pass it to payload.

  const { user: member } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!member) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar user={member} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-neutral-800">
          <div className="flex items-center gap-2 px-4">
            {/* Mobile Logo - visible only on mobile */}
            <div className="flex md:hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black font-bold">
              E
            </div>
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-neutral-700"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {/* 
                  Dynamic breadcrumbs can be added here based on path.
                  For now, we keep it simple.
                */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
