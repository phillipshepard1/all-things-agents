'use client';

import Link from 'next/link';
import { products } from '@/lib/products/config';

export function HubHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-hub-border bg-hub-background/95 backdrop-blur supports-[backdrop-filter]:bg-hub-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-display text-xl font-bold text-hub-foreground">
            All Things Agents
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {Object.values(products).map((product) => (
            <Link
              key={product.id}
              href={`/${product.slug}/`}
              className="text-sm font-medium text-hub-muted-foreground hover:text-hub-foreground transition-colors"
            >
              {product.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
