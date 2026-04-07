import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'

// Server-side PocketBase client with cookie-based auth
export async function createClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

  const cookieStore = await cookies()
  const authCookie = cookieStore.get('pb_auth')

  if (authCookie) {
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`)
    try {
      // Refresh token to keep session alive
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh()
        // Update cookie with refreshed token
        try {
          const newCookie = pb.authStore.exportToCookie({ httpOnly: false, sameSite: 'lax' })
          const parts = newCookie.split(';')[0].split('=')
          cookieStore.set(parts[0], parts.slice(1).join('='), {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
          })
        } catch {
          // Called from Server Component — cookie write ignored
        }
      }
    } catch {
      // Token invalid/expired — clear auth
      pb.authStore.clear()
    }
  }

  return pb
}
