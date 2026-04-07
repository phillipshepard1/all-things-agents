import PocketBase from 'pocketbase'

// Browser/client-side PocketBase client
export function createClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

  // Load auth from cookie if available (browser environment)
  if (typeof document !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie)
    pb.authStore.onChange(() => {
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false, sameSite: 'lax' })
    })
  }

  return pb
}
