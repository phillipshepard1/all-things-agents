"use client";

import Link from "next/link";
import { ArrowRight, StickyNote, Table2, Hand } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";

const chaosCards = [
  {
    icon: StickyNote,
    label: "STICKY NOTES",
    emoji: "📝",
  },
  {
    icon: Table2,
    label: "SPREADSHEETS",
    emoji: "📊",
  },
  {
    icon: Hand,
    label: "CROSSED FINGERS",
    emoji: "🤞",
  },
];

export function HeroIntervention() {
  return (
    <section className="relative overflow-hidden">
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

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-16 md:pb-36 lg:pb-44">
        <div className="mx-auto max-w-4xl text-center">
          {/* Three Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
          >
            {chaosCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:bg-card/80"
              >
                <div className="flex flex-col items-center">
                  <span className="mb-4 text-5xl md:text-6xl">{card.emoji}</span>
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground md:text-base">
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Confrontational Question */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-[family-name:var(--font-outfit)]"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Be honest.{" "}
              <span className="text-gradient">How&apos;s that working?</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground md:text-2xl"
          >
            Client Keeper is the CRM that finally gets real estate. Simple to
            use, zero learning curve.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 flex justify-center"
          >
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-14 px-10 text-lg font-medium shadow-warm-lg md:h-16 md:px-12 md:text-xl"
              >
                Stop the Chaos
                <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-10 text-base text-muted-foreground md:text-lg"
          >
            No credit card required &bull; 30-day free trial &bull; Cancel
            anytime
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
