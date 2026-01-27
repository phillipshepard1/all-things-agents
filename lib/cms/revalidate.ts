/**
 * Trigger revalidation of support pages after admin updates
 */
export async function revalidateSupportPages(options?: {
  path?: string
  type?: 'doc' | 'category' | 'all'
}): Promise<boolean> {
  try {
    const response = await fetch('/api/revalidate/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options || { type: 'all' }),
    })

    const result = await response.json()
    return result.revalidated === true
  } catch (error) {
    console.error('Failed to trigger revalidation:', error)
    return false
  }
}
