"use client";
// Header component - v2.5

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  Menu,
  Sparkles,
  Monitor,
  Smartphone,
  Home,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const products = [
  { id: "client-keeper", label: "Client Keeper", href: "/client-keeper-crm", current: true, icon: Home },
  { id: "atticus", label: "Atticus", href: "/atticus-social-media", current: false, icon: BookOpen },
  { id: "nicole", label: "Nicole", href: "/nicole-websites", current: false, icon: MessageSquare },
];

const navLinks = [
  { href: "/client-keeper-crm#pricing", label: "Pricing" },
  { href: "/client-keeper-crm#testimonials", label: "Testimonials" },
  { href: "/client-keeper-crm/support", label: "Support" },
];

const featuresDropdown = [
  { href: "/client-keeper-crm#features", label: "Overview", icon: Sparkles },
  { href: "/client-keeper-crm/web-app", label: "Web App", icon: Monitor },
  { href: "/client-keeper-crm/mobile", label: "Mobile App", icon: Smartphone },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Parent Bar - All Things Agents */}
      {/* Mobile: Slim, single tappable back link (28px height) */}
      {/* Desktop: Full 3-column layout (36px height) */}
      <div className="h-7 md:h-9 w-full bg-[#4a1d91]/95 backdrop-blur-sm">
        {/* Mobile: Full-width tappable back link */}
        <Link
          href="/"
          className="md:hidden flex h-full w-full items-center justify-center gap-1.5 text-xs text-neutral-400 active:bg-neutral-800 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>All Things Agents</span>
        </Link>

        {/* Desktop: Full 3-column layout */}
        <div className="container mx-auto hidden h-full max-w-6xl items-center justify-between px-4 md:flex">
          {/* Left - Back to All Things Agents */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-200"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>All Things Agents</span>
          </Link>

          {/* Right - Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto flex items-center gap-1 text-xs font-medium text-neutral-300 transition-colors hover:text-neutral-100">
              Products
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="min-w-[160px] border-neutral-700 bg-neutral-800"
            >
              {products.map((product) => (
                <DropdownMenuItem key={product.id} asChild>
                  <Link
                    href={product.href}
                    className="flex cursor-pointer items-center justify-between gap-3 text-neutral-200"
                  >
                    <span>{product.label}</span>
                    {product.current && (
                      <Check className="h-3.5 w-3.5 text-accent" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Header - Client Keeper */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/client-keeper-crm"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo.avif"
              alt="Client Keeper"
              width={160}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-base md:text-home-base font-medium text-muted-foreground transition-colors hover:text-foreground">
                Features
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {featuresDropdown.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base md:text-home-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-base md:text-home-base h-11 px-5" asChild>
              <Link href="https://appnew.clientkeepercrm.com/login">
                Sign In
              </Link>
            </Button>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base md:text-home-base h-11 px-6"
              asChild
            >
              <Link href="https://appnew.clientkeepercrm.com/register">
                Start Free
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="min-h-[44px] min-w-[44px]"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 sm:w-[320px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Main Navigation */}
                <nav className="flex flex-col px-6 pt-12">
                  {/* Features Section */}
                  <div className="border-b border-border/50 py-3">
                    <span className="flex min-h-[44px] items-center text-base font-medium text-foreground">
                      Features
                    </span>
                    <div className="flex flex-col gap-1">
                      {featuresDropdown.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base text-muted-foreground transition-colors hover:bg-accent/5 hover:text-foreground"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-[44px] items-center border-b border-border/50 text-base font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile CTAs - pushed to bottom */}
                <div className="mt-auto flex flex-col gap-3 p-6">
                  {/* Download App Section */}
                  <div className="border-b border-border/50 pb-4 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Download the App
                    </span>
                    <div className="mt-3 flex flex-col gap-2">
                      <a
                        href="https://apps.apple.com/us/app/client-keeper-real-estate-crm/id6468638954"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-black text-white px-4 py-2 transition-opacity hover:opacity-90"
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span className="text-sm font-medium">App Store</span>
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.clientkeepercrm.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-black text-white px-4 py-2 transition-opacity hover:opacity-90"
                      >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        <span className="text-sm font-medium">Google Play</span>
                      </a>
                    </div>
                  </div>

                  <SheetClose asChild>
                    <Button variant="outline" size="lg" className="w-full min-h-[48px]" asChild>
                      <Link href="https://appnew.clientkeepercrm.com/login">
                        Sign In
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      size="lg"
                      className="w-full min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90"
                      asChild
                    >
                      <Link href="https://appnew.clientkeepercrm.com/register">
                        Start Free
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}
