"use client";

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
      <div className="h-7 md:h-9 w-full bg-neutral-900/95 backdrop-blur-sm">
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

          {/* Center - Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-medium text-neutral-300 transition-colors hover:text-neutral-100">
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

          {/* Right - Support Link */}
          <Link
            href="/client-keeper-crm/support"
            className="text-xs text-neutral-400 transition-colors hover:text-neutral-200"
          >
            Support
          </Link>
        </div>
      </div>

      {/* Main Header - Client Keeper */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
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
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Features
                <ChevronDown className="h-3 w-3" />
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://appnew.clientkeepercrm.com/login">
                Sign In
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
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
                {/* Products Switcher - Top of sheet */}
                <div className="border-b border-border/50 bg-neutral-50/50 dark:bg-neutral-900/50 px-6 pt-12 pb-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    All Things Agents
                  </span>
                  <div className="mt-3 flex flex-col gap-1">
                    {products.map((product) => (
                      <SheetClose asChild key={product.id}>
                        <Link
                          href={product.href}
                          className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-base transition-colors ${
                            product.current
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <product.icon className="h-4 w-4" />
                            {product.label}
                          </span>
                          {product.current && (
                            <Check className="h-4 w-4 text-accent" />
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex flex-col px-6 pt-2">
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
