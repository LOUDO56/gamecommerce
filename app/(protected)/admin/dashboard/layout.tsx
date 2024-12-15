import { auth } from '@/auth'
import { AdminSidebarDashboard } from '@/components/admin/admin-sidebar-dashboard'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth();

  if(session?.user.role === "USER") redirect('/');

  return (
    <SidebarProvider>
      <AdminSidebarDashboard />
      <main className='w-full min-h-full'>
        <SidebarTrigger className='absolute' />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout