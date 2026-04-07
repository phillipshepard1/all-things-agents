import PocketBase from 'pocketbase'

// Unauthenticated PocketBase client for public-facing pages
// No cookies, no auth refresh — just reads public data
export function createPublicClient() {
  return new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
}
