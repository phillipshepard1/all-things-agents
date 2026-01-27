import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
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
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // If no user, the middleware will handle redirect
  // But we still check here for the layout
  if (!user) {
    redirect('/login')
  }

  // Get admin profile using service role to bypass RLS
  const adminSupabase = createAdminClient()
  const { data: profile } = await adminSupabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/login?error=unauthorized')
  }

  const userProfile = {
    email: user.email || '',
    full_name: profile.full_name,
    role: profile.role,
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
