"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, FlaskConical, ChevronDown, Monitor, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/support", label: "Support" },
];

const featuresDropdown = [
  { href: "/#features", label: "Overview", icon: Sparkles },
  { href: "/web-app", label: "Web App", icon: Monitor },
  { href: "/mobile", label: "Mobile App", icon: Smartphone },
];

const testPages = [
  { href: "/test-myra/v3", label: "MYRA V3 - Centered" },
  { href: "/test-myra/v4", label: "MYRA V4 - Chat" },
  { href: "/test-myra/v5", label: "MYRA V5 - Auto-Play" },
  { href: "/test-myra/v6", label: "MYRA V6 - Voice Memo" },
  { href: "/test-myra/v7", label: "MYRA V7 - Bento" },
  { href: "/test-myra/v8", label: "MYRA V8 - Animated" },
  { href: "/test-myra/v12", label: "MYRA V12 - Beams" },
  { href: "/test-text/word-rotate", label: "Text - Word Rotate" },
  { href: "/test-text/morphing", label: "Text - Morphing" },
  { href: "/test-text/typing", label: "Text - Typing" },
  { href: "/test-text/scramble", label: "Text - Scramble" },
  { href: "/test-pricing/v1", label: "Pricing V1 - Magic Card" },
  { href: "/test-pricing/v2", label: "Pricing V2 - Shine Border" },
  { href: "/test-pricing/v3", label: "Pricing V3 - Border Beam" },
  { href: "/test-pricing/v4", label: "Pricing V4 - Neon Gradient" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
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
                  <Link href={item.href} className="flex cursor-pointer items-center gap-2">
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

          {/* Tests Dropdown - only visible in development */}
          {process.env.NODE_ENV === "development" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80">
                <FlaskConical className="h-4 w-4" />
                Tests
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {testPages.map((page) => (
                  <DropdownMenuItem key={page.href} asChild>
                    <Link href={page.href} className="cursor-pointer">
                      {page.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://appnew.clientkeepercrm.com/login">Sign In</Link>
          </Button>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            asChild
          >
            <Link href="https://appnew.clientkeepercrm.com/register">Start Free</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[300px] p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col">
              {/* Mobile Nav Links */}
              <nav className="flex flex-col px-6 pt-12">
                {/* Features Section */}
                <div className="border-b border-border/50 py-4">
                  <span className="flex items-center gap-2 text-lg font-medium text-foreground">
                    Features
                  </span>
                  <div className="mt-3 flex flex-col gap-2 pl-4">
                    {featuresDropdown.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-accent"
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
                      className="border-b border-border/50 py-4 text-lg font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                {/* Tests Section - only visible in development */}
                {process.env.NODE_ENV === "development" && (
                  <div className="border-b border-border/50 py-4">
                    <span className="flex items-center gap-2 text-lg font-medium text-accent">
                      <FlaskConical className="h-5 w-5" />
                      Tests
                    </span>
                    <div className="mt-3 flex flex-col gap-2 pl-7">
                      {testPages.map((page) => (
                        <SheetClose asChild key={page.href}>
                          <Link
                            href={page.href}
                            className="text-base text-muted-foreground transition-colors hover:text-accent"
                          >
                            {page.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                )}
              </nav>

              {/* Mobile CTAs - pushed to bottom */}
              <div className="mt-auto flex flex-col gap-3 p-6">
                <SheetClose asChild>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="https://appnew.clientkeepercrm.com/login">Sign In</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <Link href="https://appnew.clientkeepercrm.com/register">Start Free</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
