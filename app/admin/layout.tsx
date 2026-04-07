import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/pocketbase/server'
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar'
import { AdminHeader } from '@/components/admin/layout/admin-header'
import { AdminProductProvider } from '@/lib/products/admin-context'

// Prevent admin pages from being indexed
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pb = await createClient()

  if (!pb.authStore.isValid || !pb.authStore.record) {
    redirect('/login')
  }

  const user = pb.authStore.record

  if (!user.role) {
    redirect('/login?error=unauthorized')
  }

  const userProfile = {
    email: user.email || '',
    full_name: user.name,
    role: user.role,
  }

  return (
    <AdminProductProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar user={userProfile} />
        <AdminHeader user={userProfile} />

        <main className="lg:pl-64">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </AdminProductProvider>
  )
}
