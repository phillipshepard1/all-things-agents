'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import PocketBase from 'pocketbase'

export async function login(formData: FormData) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const authData = await pb.collection('users').authWithPassword(email, password)

    // Check if user has a role (admin/editor)
    if (!authData.record.role) {
      pb.authStore.clear()
      return { error: 'You do not have admin access.' }
    }

    // Set auth cookie using PocketBase's export format
    const cookieStore = await cookies()
    const exportedCookie = pb.authStore.exportToCookie({
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    // Parse the exported cookie to extract name and value
    const [nameValue, ...rest] = exportedCookie.split(';')
    const eqIndex = nameValue.indexOf('=')
    const cookieName = nameValue.substring(0, eqIndex)
    const cookieValue = nameValue.substring(eqIndex + 1)

    cookieStore.set(cookieName, cookieValue, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch {
    return { error: 'Invalid email or password.' }
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('pb_auth')
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function resetPassword(formData: FormData) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const email = formData.get('email') as string

  try {
    await pb.collection('users').requestPasswordReset(email)
  } catch {
    // Don't reveal if email exists or not
  }

  return { success: true, error: null as string | null }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  // PocketBase handles password reset via its own flow
  return { error: 'Please use the password reset link from your email.' }
}
