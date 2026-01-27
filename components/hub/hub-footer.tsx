import Link from 'next/link';
import { products } from '@/lib/products/config';

export function HubFooter() {
  return (
    <footer className="border-t border-hub-border bg-hub-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-lg font-bold text-hub-foreground">
              All Things Agents
            </Link>
            <p className="mt-2 text-sm text-hub-muted-foreground">
              Simple, powerful tools for real estate agents.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-hub-foreground mb-3">Products</h3>
            <ul className="space-y-2">
              {Object.values(products).map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/${product.slug}/`}
                    className="text-sm text-hub-muted-foreground hover:text-hub-foreground transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-hub-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-hub-muted-foreground hover:text-hub-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-hub-muted-foreground hover:text-hub-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-hub-foreground mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client-keeper-crm/support/" className="text-sm text-hub-muted-foreground hover:text-hub-foreground transition-colors">
                  Client Keeper Help
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-hub-border">
          <p className="text-sm text-hub-muted-foreground text-center">
            © {new Date().getFullYear()} All Things Agents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
