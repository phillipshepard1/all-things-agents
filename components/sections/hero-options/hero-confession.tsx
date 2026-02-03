"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function HeroConfession() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Warm cream/lavender gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fef7f0] via-[#faf5ff] to-[#f5f0ff]" />

      {/* Subtle animated orbs - softer for this design */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Warm cream orb - top left */}
        <div className="animate-float-slower absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#fef3e2]/60 via-[#fff8f0]/40 to-transparent blur-3xl" />
        {/* Soft lavender orb - bottom right */}
        <div className="animate-float-slow absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#e8dff5]/50 via-[#f3eeff]/30 to-transparent blur-3xl" />
        {/* Center accent orb */}
        <div className="animate-float-reverse absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-b from-[#f5e6d3]/40 to-transparent blur-3xl" />
      </div>

      {/* Back link and option label */}
      <div className="container mx-auto max-w-4xl px-4 pt-8 md:pt-16">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/client-keeper-crm/hero-preview"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to options
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            Option 5
          </span>
        </div>
      </div>

      {/* Main content - Conversational flow */}
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <div className="space-y-8 md:space-y-10">
          {/* Opening line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#5c4a6e] font-[family-name:var(--font-outfit)]"
          >
            Let&apos;s be real for a second.
          </motion.p>

          {/* The confession */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#300092] font-[family-name:var(--font-outfit)]"
          >
            You&apos;re managing million-dollar deals with sticky notes and spreadsheets.
          </motion.p>

          {/* The punchline - emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.175, 0.885, 0.32, 1.275], // Slight bounce
            }}
            className="py-4"
          >
            <span className="text-6xl md:text-7xl lg:text-8xl" role="img" aria-label="crossed fingers">
              🤞
            </span>
          </motion.div>

          {/* Follow-up text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-[#6b5b7a] max-w-2xl"
          >
            Your clients deserve better. So do you.
          </motion.p>

          {/* Solution intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="text-xl md:text-2xl font-medium text-[#300092]"
          >
            Meet{" "}
            <span className="text-gradient font-semibold">Client Keeper</span>
            {" "}&mdash; the CRM that finally gets real estate.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="pt-6"
          >
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-medium shadow-warm-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1, ease: "easeOut" }}
            className="text-base md:text-lg text-muted-foreground"
          >
            No credit card required &bull; 30-day free trial &bull; Cancel anytime
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fef7f0] to-transparent" />
    </section>
  );
}
