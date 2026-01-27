import { DollarSign } from 'lucide-react'

export default function AdminPricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
          Pricing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update pricing tiers and features
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Coming Soon</h3>
        <p className="mt-2 text-sm text-gray-500">
          Pricing management will be available once the database is set up.
        </p>
      </div>
    </div>
  )
}
