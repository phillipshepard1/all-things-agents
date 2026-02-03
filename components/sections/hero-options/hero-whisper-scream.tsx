"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";

export function HeroWhisperScream() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main purple orb - top right */}
        <div className="animate-float-slow absolute -right-20 -top-20 h-[690px] w-[690px] md:h-[750px] md:w-[750px] rounded-full bg-gradient-to-br from-[#7a36dd]/30 via-[#9b5de5]/20 to-transparent blur-3xl" />
        {/* Secondary orb - bottom left */}
        <div className="animate-float-reverse absolute -bottom-32 -left-32 h-[575px] w-[575px] md:h-[625px] md:w-[625px] rounded-full bg-gradient-to-tr from-[#300092]/20 via-[#7a36dd]/15 to-transparent blur-3xl" />
        {/* Accent orb - center */}
        <div className="animate-float-slower absolute left-1/2 top-1/3 h-[460px] w-[460px] md:h-[500px] md:w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e4d9ff]/40 via-[#c8b6ff]/20 to-transparent blur-3xl" />
        {/* Small accent orb */}
        <div className="animate-float-slow absolute right-1/4 top-1/2 h-[230px] w-[230px] md:h-[250px] md:w-[250px] rounded-full bg-[#9b5de5]/20 blur-2xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-8 md:pt-16 pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          {/* Option Label */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
              Option 4: The Whisper to Scream
            </span>
          </div>

          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/client-keeper-crm/hero-preview"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              &larr; Back to all options
            </Link>
          </div>

          {/* Tiny whisper text */}
          <motion.p
            className="text-xs md:text-sm text-muted-foreground/60 tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            sticky notes... spreadsheets... maybe a prayer...
          </motion.p>

          {/* MASSIVE display text with slam-in animation */}
          <div className="font-[family-name:var(--font-outfit)] overflow-visible">
            <motion.h1
              className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black leading-[0.85] tracking-tighter text-gradient"
              initial={{ opacity: 0, scale: 1.5, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5,
              }}
            >
              <motion.span
                className="block"
                animate={{
                  x: [0, -3, 3, -2, 2, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: 1.1,
                  ease: "easeInOut",
                }}
              >
                CROSSED
              </motion.span>
              <motion.span
                className="block"
                animate={{
                  x: [0, 3, -3, 2, -2, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: 1.15,
                  ease: "easeInOut",
                }}
              >
                FINGERS?
              </motion.span>
            </motion.h1>
          </div>

          {/* Statement below */}
          <motion.div
            className="mt-8 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
              That&apos;s not a CRM.{" "}
              <span className="text-gradient font-bold">This is.</span>
            </p>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Meet Client Keeper — the CRM that finally gets real estate.
            Simple to use, zero learning curve, and actually helps you close more deals.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
          >
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-16 px-12 text-xl md:text-home-lg font-medium shadow-warm-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2.5 h-6 w-6" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            className="mt-10 text-lg md:text-home-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            No credit card required &bull; 30-day free trial &bull; Cancel anytime
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
