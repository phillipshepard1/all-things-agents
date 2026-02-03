'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/lib/products/config';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';

const hubNavLinks = [
  { href: '/support', label: 'Support' },
  { href: '/why', label: 'Our Why' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export function HubHeader() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkStyles = "relative text-[17px] font-medium text-hub-foreground/70 hover:text-hub-foreground transition-colors duration-200";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hub-border/50 bg-hub-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/allthingsagents-logo.png"
            alt="All Things Agents"
            width={2000}
            height={750}
            className="h-[38px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
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
                className={`h-[18px] w-[18px] transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
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

          <Link href="/why" className={navLinkStyles}>
            Our Why
          </Link>

          <Link href="/about" className={navLinkStyles}>
            About Us
          </Link>

          <Link href="/contact" className={navLinkStyles}>
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="min-h-[44px] min-w-[44px] text-hub-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] p-0 sm:w-[320px] bg-hub-background border-hub-border"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col">
              {/* Products Section */}
              <div className="border-b border-hub-border/50 px-6 pt-14 pb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-hub-muted-foreground">
                  Our Products
                </span>
                <div className="mt-3 flex flex-col gap-1">
                  {Object.values(products).map((product) => (
                    <SheetClose asChild key={product.id}>
                      <Link
                        href={`/${product.slug}/`}
                        className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-hub-foreground transition-colors hover:bg-hub-muted"
                      >
                        {product.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* Hub Navigation */}
              <nav className="flex flex-col px-6 pt-2">
                {hubNavLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-[44px] items-center border-b border-hub-border/50 text-base font-medium text-hub-foreground transition-colors hover:text-hub-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
