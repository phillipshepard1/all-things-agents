'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

// Helper to check if current user is admin
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    throw new Error('Admin access required')
  }

  return { user, supabase }
}

// Update own profile (name)
export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const name = formData.get('name') as string

  const { error } = await supabase
    .from('admin_profiles')
    .update({ name, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/settings')
  return { success: true }
}

// Change own password
export async function changePassword(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (newPassword.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  // First verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  })

  if (signInError) {
    return { error: 'Current password is incorrect' }
  }

  // Update password
  const { error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

// Invite a new team member (admin only)
export async function inviteTeamMember(formData: FormData) {
  try {
    const { user, supabase } = await requireAdmin()

    const email = formData.get('email') as string
    const role = formData.get('role') as string

    if (!email || !role) {
      return { error: 'Email and role are required' }
    }

    if (!['admin', 'editor'].includes(role)) {
      return { error: 'Invalid role' }
    }

    // Check if user already exists
    const { data: existingProfile } = await supabase
      .from('admin_profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (existingProfile) {
      return { error: 'A user with this email already exists' }
    }

    // Check if invite already pending
    const { data: existingInvite } = await supabase
      .from('team_invites')
      .select('id')
      .eq('email', email)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (existingInvite) {
      return { error: 'An invite is already pending for this email' }
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiry

    // Create invite
    const { error: insertError } = await supabase
      .from('team_invites')
      .insert({
        email,
        role,
        invited_by: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      })

    if (insertError) {
      return { error: insertError.message }
    }

    // Send invite email via Supabase
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const inviteUrl = `${siteUrl}/invite/${token}`

    // Use Supabase to send email (we'll use their auth email for now)
    // In production, you might want to use a dedicated email service
    const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: inviteUrl,
    })

    // If email fails, we still created the invite - admin can share link manually
    if (emailError) {
      console.error('Failed to send invite email:', emailError)
      // Return success but with the invite URL for manual sharing
      return {
        success: true,
        inviteUrl,
        message: 'Invite created. Email could not be sent automatically - share this link manually.'
      }
    }

    revalidatePath('/admin/settings')
    return { success: true, message: 'Invite sent successfully' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to send invite' }
  }
}

// Update a team member's role (admin only)
export async function updateUserRole(formData: FormData) {
  try {
    const { user, supabase } = await requireAdmin()

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

    const { error } = await supabase
      .from('admin_profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', userId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update role' }
  }
}

// Remove a team member (admin only)
export async function removeTeamMember(formData: FormData) {
  try {
    const { user, supabase } = await requireAdmin()

    const userId = formData.get('userId') as string

    if (!userId) {
      return { error: 'User ID is required' }
    }

    // Prevent removing self
    if (userId === user.id) {
      return { error: 'You cannot remove yourself' }
    }

    // Delete from admin_profiles first
    const { error: profileError } = await supabase
      .from('admin_profiles')
      .delete()
      .eq('id', userId)

    if (profileError) {
      return { error: profileError.message }
    }

    // Delete from auth.users (requires service role)
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)

    if (authError) {
      console.error('Failed to delete auth user:', authError)
      // Profile is already deleted, so we continue
    }

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to remove user' }
  }
}

// Cancel a pending invite (admin only)
export async function cancelInvite(formData: FormData) {
  try {
    const { supabase } = await requireAdmin()

    const inviteId = formData.get('inviteId') as string

    if (!inviteId) {
      return { error: 'Invite ID is required' }
    }

    const { error } = await supabase
      .from('team_invites')
      .delete()
      .eq('id', inviteId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to cancel invite' }
  }
}

// Get all team members (admin only)
export async function getTeamMembers() {
  try {
    const { supabase } = await requireAdmin()

    const { data, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get team members' }
  }
}

// Get pending invites (admin only)
export async function getPendingInvites() {
  try {
    const { supabase } = await requireAdmin()

    const { data, error } = await supabase
      .from('team_invites')
      .select('*, inviter:invited_by(name, email)')
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get invites' }
  }
}
