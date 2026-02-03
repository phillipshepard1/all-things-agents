"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { motion } from "motion/react";

// Shared headline component for consistency
function Headline() {
  return (
    <h2 className="text-5xl font-extrabold tracking-tight text-gradient md:text-7xl">
      Client Keeper.
    </h2>
  );
}

// Option A: Bolder Weight + Larger Size + More Spacing
function OptionA() {
  return (
    <div className="space-y-6 text-center">
      <Headline />
      <p className="mx-auto max-w-2xl text-2xl font-medium tracking-wide text-foreground/80 md:text-3xl leading-relaxed">
        The CRM that makes real estate easy.
        <br />
        Simple to use, zero learning curve.
      </p>
    </div>
  );
}

// Option B: Two-Tone Treatment (Highlight Key Words)
function OptionB() {
  return (
    <div className="space-y-6 text-center">
      <Headline />
      <p className="mx-auto max-w-2xl text-2xl font-medium text-foreground/70 md:text-3xl leading-relaxed">
        The CRM that makes{" "}
        <span className="text-gradient font-semibold">real estate easy</span>.
        <br />
        Simple to use,{" "}
        <span className="text-gradient font-semibold">zero learning curve</span>
        .
      </p>
    </div>
  );
}

// Option C: Stacked Layout with Visual Separator
function OptionC() {
  return (
    <div className="space-y-6 text-center">
      <Headline />
      {/* Decorative divider */}
      <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto max-w-2xl space-y-2">
        <span className="block text-2xl font-semibold text-foreground md:text-3xl">
          The CRM that makes real estate easy.
        </span>
        <span className="block text-lg font-medium text-muted-foreground md:text-xl">
          Simple to use, zero learning curve.
        </span>
      </div>
    </div>
  );
}

// Option D: Subtle Glow + Weight Increase (Recommended)
function OptionD() {
  return (
    <div className="space-y-6 text-center">
      <Headline />
      <p className="mx-auto max-w-2xl text-2xl font-semibold tracking-wide text-foreground/90 md:text-[1.75rem] leading-relaxed drop-shadow-sm">
        The CRM that makes real estate easy.
        <br />
        Simple to use, zero learning curve.
      </p>
    </div>
  );
}

interface OptionCardProps {
  label: string;
  title: string;
  description: string;
  recommended?: boolean;
  children: React.ReactNode;
}

function OptionCard({
  label,
  title,
  description,
  recommended,
  children,
}: OptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border ${
        recommended
          ? "border-accent/50 shadow-lg shadow-accent/10"
          : "border-border"
      } bg-card p-8 md:p-12`}
    >
      {/* Label */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-lg font-bold text-accent">
            {label}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {recommended && (
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <Star className="h-4 w-4 fill-accent" />
            Recommended
          </span>
        )}
      </div>

      {/* Preview area with subtle background */}
      <div className="rounded-xl bg-background/50 p-8 md:p-12">{children}</div>
    </motion.div>
  );
}

export default function SubheadlineComparePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto max-w-5xl px-4 pt-8">
        <div className="flex items-center justify-between">
          <Link
            href="/client-keeper-crm/hero-preview"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hero Preview
          </Link>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            Subheadline Styling
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Subheadline Styling Comparison
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Compare the four styling options below and pick your favorite.
        </p>
      </div>

      {/* Options */}
      <div className="container mx-auto max-w-5xl space-y-8 px-4 pb-16">
        <OptionCard
          label="A"
          title="Bolder Weight + Larger Size"
          description="Increased weight, larger size, and letter-spacing for elegance"
        >
          <OptionA />
        </OptionCard>

        <OptionCard
          label="B"
          title="Two-Tone with Gradient Highlights"
          description='Key phrases "real estate easy" and "zero learning curve" highlighted with gradient'
        >
          <OptionB />
        </OptionCard>

        <OptionCard
          label="C"
          title="Visual Hierarchy with Divider"
          description="Decorative separator with primary statement larger than supporting detail"
        >
          <OptionC />
        </OptionCard>

        <OptionCard
          label="D"
          title="Bolder + Subtle Glow"
          description="Clean design with extra weight and subtle text shadow for depth"
          recommended
        >
          <OptionD />
        </OptionCard>
      </div>
    </div>
  );
}
