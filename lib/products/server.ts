import { cookies } from 'next/headers'
import type { ProductId } from './config'

export type AdminProductId = ProductId | 'hub'

export async function getAdminProduct(): Promise<AdminProductId | null> {
  const cookieStore = await cookies()
  const productCookie = cookieStore.get('admin-product')
  return (productCookie?.value as AdminProductId) || null
}
