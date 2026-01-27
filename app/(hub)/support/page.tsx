import Link from 'next/link';

export const metadata = {
  title: 'Support | All Things Agents',
  description: 'Get help with All Things Agents products',
};

export default function SupportPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground mb-4">
        Support
      </h1>
      <p className="text-lg text-hub-muted-foreground mb-8 text-center max-w-md">
        Need help? Check out our product-specific support pages.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/client-keeper-crm/support"
          className="px-6 py-3 bg-hub-accent text-hub-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Client Keeper Support
        </Link>
      </div>
    </div>
  );
}
