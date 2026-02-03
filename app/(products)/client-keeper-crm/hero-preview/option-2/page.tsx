import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HeroStrikethrough } from "@/components/sections/hero-options/hero-strikethrough";

export default function Option2Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Option label and back link */}
      <div className="container mx-auto max-w-6xl px-4 pt-6">
        <div className="flex items-center justify-between">
          <Link
            href="/client-keeper-crm/hero-preview"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to options
          </Link>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            Option 2: The Strikethrough
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <HeroStrikethrough />
    </div>
  );
}
