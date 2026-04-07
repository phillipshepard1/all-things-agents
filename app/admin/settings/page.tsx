import { redirect } from 'next/navigation'
import { createClient } from '@/lib/pocketbase/server'
import { createAdminClient } from '@/lib/pocketbase/admin'
import { SettingsTabs } from './components/settings-tabs'

export default async function AdminSettingsPage() {
  const pb = await createClient()

  if (!pb.authStore.isValid || !pb.authStore.record) {
    redirect('/login')
  }

  const user = pb.authStore.record

  if (!user.role) {
    redirect('/login?error=unauthorized')
  }

  const isAdmin = user.role === 'admin'

  // Get team members if admin
  let teamMembers: { id: string; email: string; name: string; role: string; created_at: string; updated_at: string }[] = []
  let pendingInvites: { id: string; email: string; role: string; created_at: string; expires_at: string }[] = []

  if (isAdmin) {
    try {
      const adminPb = await createAdminClient()
      const members = await adminPb.collection('users').getFullList({ sort: 'created' })
      teamMembers = members.map(m => ({
        id: m.id,
        email: m.email,
        name: m.name || '',
        role: m.role,
        created_at: m.created,
        updated_at: m.updated,
      }))

      const invites = await adminPb.collection('team_invites').getFullList({
        filter: `accepted_at = "" && expires_at > "${new Date().toISOString()}"`,
        sort: '-created',
      })
      pendingInvites = invites.map(i => ({
        id: i.id,
        email: i.email,
        role: i.role,
        created_at: i.created,
        expires_at: i.expires_at,
      }))
    } catch (err) {
      console.error('Error fetching team data:', err)
    }
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
          name: user.name || '',
          role: user.role,
        }}
        isAdmin={isAdmin}
        teamMembers={teamMembers}
        pendingInvites={pendingInvites}
      />
    </div>
  )
}
