'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/pocketbase/server'
import { createAdminClient } from '@/lib/pocketbase/admin'
import crypto from 'crypto'

// Helper to check if current user is admin
async function requireAdmin() {
  const pb = await createClient()

  if (!pb.authStore.isValid || !pb.authStore.record) {
    throw new Error('Not authenticated')
  }

  const user = pb.authStore.record

  if (user.role !== 'admin') {
    throw new Error('Admin access required')
  }

  return { user, pb }
}

// Update own profile (name)
export async function updateProfile(formData: FormData) {
  const pb = await createClient()

  if (!pb.authStore.isValid || !pb.authStore.record) {
    return { error: 'Not authenticated' }
  }

  const name = formData.get('name') as string

  try {
    await pb.collection('users').update(pb.authStore.record.id, { name })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update profile'
    return { error: message }
  }

  revalidatePath('/admin/settings')
  return { success: true }
}

// Change own password
export async function changePassword(formData: FormData) {
  const pb = await createClient()

  if (!pb.authStore.isValid || !pb.authStore.record) {
    return { error: 'Not authenticated' }
  }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  try {
    // Use admin client to update password (avoids needing oldPassword verification via SDK)
    const adminPb = await createAdminClient()
    await adminPb.collection('users').update(pb.authStore.record.id, {
      password: newPassword,
      passwordConfirm: newPassword,
      oldPassword: currentPassword,
    })
  } catch {
    return { error: 'Current password is incorrect or update failed' }
  }

  return { success: true }
}

// Invite a new team member (admin only)
export async function inviteTeamMember(formData: FormData) {
  try {
    const { user } = await requireAdmin()
    const adminPb = await createAdminClient()

    const email = formData.get('email') as string
    const role = formData.get('role') as string

    if (!email || !role) {
      return { error: 'Email and role are required' }
    }

    if (!['admin', 'editor'].includes(role)) {
      return { error: 'Invalid role' }
    }

    // Check if user already exists
    try {
      await adminPb.collection('users').getFirstListItem(`email = "${email}"`)
      return { error: 'A user with this email already exists' }
    } catch {
      // User doesn't exist — good
    }

    // Check if invite already pending
    try {
      await adminPb.collection('team_invites').getFirstListItem(
        `email = "${email}" && accepted_at = "" && expires_at > "${new Date().toISOString()}"`
      )
      return { error: 'An invite is already pending for this email' }
    } catch {
      // No pending invite — good
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiry

    // Create invite
    await adminPb.collection('team_invites').create({
      email,
      role,
      invited_by: user.id,
      token,
      expires_at: expiresAt.toISOString(),
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const inviteUrl = `${siteUrl}/invite/${token}`

    // PocketBase doesn't have built-in invite email — return URL for manual sharing
    revalidatePath('/admin/settings')
    return {
      success: true,
      inviteUrl,
      message: 'Invite created. Share this link with the team member.'
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to send invite' }
  }
}

// Update a team member's role (admin only)
export async function updateUserRole(formData: FormData) {
  try {
    const { user } = await requireAdmin()
    const adminPb = await createAdminClient()

    const userId = formData.get('userId') as string
    const role = formData.get('role') as string

    if (!userId || !role) {
      return { error: 'User ID and role are required' }
    }

    if (!['admin', 'editor'].includes(role)) {
      return { error: 'Invalid role' }
    }

    // Prevent changing own role
    if (userId === user.id) {
      return { error: 'You cannot change your own role' }
    }

    await adminPb.collection('users').update(userId, { role })

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update role' }
  }
}

// Remove a team member (admin only)
export async function removeTeamMember(formData: FormData) {
  try {
    const { user } = await requireAdmin()
    const adminPb = await createAdminClient()

    const userId = formData.get('userId') as string

    if (!userId) {
      return { error: 'User ID is required' }
    }

    // Prevent removing self
    if (userId === user.id) {
      return { error: 'You cannot remove yourself' }
    }

    // Delete user (PocketBase handles both auth and profile in one collection)
    await adminPb.collection('users').delete(userId)

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to remove user' }
  }
}

// Cancel a pending invite (admin only)
export async function cancelInvite(formData: FormData) {
  try {
    const adminPb = await createAdminClient()
    await requireAdmin()

    const inviteId = formData.get('inviteId') as string

    if (!inviteId) {
      return { error: 'Invite ID is required' }
    }

    await adminPb.collection('team_invites').delete(inviteId)

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to cancel invite' }
  }
}

// Get all team members (admin only)
export async function getTeamMembers() {
  try {
    await requireAdmin()
    const adminPb = await createAdminClient()

    const records = await adminPb.collection('users').getFullList({
      sort: 'created',
    })

    const data = records.map(r => ({
      id: r.id,
      email: r.email,
      name: r.name,
      role: r.role,
      created_at: r.created,
      updated_at: r.updated,
    }))

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get team members' }
  }
}

// Get pending invites (admin only)
export async function getPendingInvites() {
  try {
    await requireAdmin()
    const adminPb = await createAdminClient()

    const records = await adminPb.collection('team_invites').getFullList({
      filter: `accepted_at = "" && expires_at > "${new Date().toISOString()}"`,
      sort: '-created',
      expand: 'invited_by',
    })

    const data = records.map(r => ({
      id: r.id,
      email: r.email,
      role: r.role,
      token: r.token,
      expires_at: r.expires_at,
      created_at: r.created,
      inviter: r.expand?.invited_by ? {
        name: r.expand.invited_by.name,
        email: r.expand.invited_by.email,
      } : null,
    }))

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get invites' }
  }
}
