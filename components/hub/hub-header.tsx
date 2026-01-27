'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/products/config';
import { ChevronDown } from 'lucide-react';

export function HubHeader() {
  const [productsOpen, setProductsOpen] = useState(false);

  const navLinkStyles = "relative text-[15px] font-medium text-hub-foreground/70 hover:text-hub-foreground transition-colors duration-200";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hub-border/50 bg-hub-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl font-bold tracking-tight text-hub-foreground">
            All Things Agents
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 lg:gap-12">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className={`flex items-center gap-1.5 ${navLinkStyles}`}>
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Outer container: pt-3 creates invisible hover bridge, no visual gap */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 ${
                productsOpen ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Inner container: all visual styling */}
              <div
                className={`rounded-xl border border-hub-border/60 bg-hub-background shadow-lg shadow-hub-foreground/5 transition-all duration-200 ${
                  productsOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                <div className="p-2">
                {Object.values(products).map((product) => (
                  <Link
                    key={product.id}
                    href={`/${product.slug}/`}
                    className="block rounded-lg px-4 py-3 transition-colors hover:bg-hub-muted"
                  >
                    <div className="text-sm font-semibold text-hub-foreground">{product.name}</div>
                    <div className="text-xs text-hub-muted-foreground mt-0.5">{product.tagline}</div>
                  </Link>
                ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/support" className={navLinkStyles}>
            Support
          </Link>

          <Link href="/about" className={navLinkStyles}>
            About Us
          </Link>

          <Link href="/contact" className={navLinkStyles}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
