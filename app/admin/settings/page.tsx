import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SettingsTabs } from './components/settings-tabs'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get current user's profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/login?error=unauthorized')
  }

  const isAdmin = profile.role === 'admin'

  // Get team members if admin
  let teamMembers: typeof profile[] = []
  let pendingInvites: { id: string; email: string; role: string; created_at: string; expires_at: string }[] = []

  if (isAdmin) {
    const { data: members } = await supabase
      .from('admin_profiles')
      .select('*')
      .order('created_at', { ascending: true })

    teamMembers = members || []

    const { data: invites } = await supabase
      .from('team_invites')
      .select('*')
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    pendingInvites = invites || []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and team settings
        </p>
      </div>

      <SettingsTabs
        user={{
          id: user.id,
          email: user.email || '',
          name: profile.name || '',
          role: profile.role,
        }}
        isAdmin={isAdmin}
        teamMembers={teamMembers}
        pendingInvites={pendingInvites}
      />
    </div>
  )
}
