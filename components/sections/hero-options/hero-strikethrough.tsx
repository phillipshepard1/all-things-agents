"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const strikethroughItems = [
  "Sticky Notes",
  "Spreadsheets",
  "Crossed Fingers",
  "Lost Leads",
];

export function HeroStrikethrough() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showClientKeeper, setShowClientKeeper] = useState(false);

  useEffect(() => {
    // Start strikethrough animation sequence
    const delays = [500, 1200, 1900, 2600];

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setCurrentIndex(index);
      }, delay);
    });

    // Show Client Keeper after all strikethroughs
    setTimeout(() => {
      setShowClientKeeper(true);
    }, 3400);
  }, []);

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
          {/* Strikethrough Text */}
          <div className="font-[family-name:var(--font-outfit)] mb-8 min-h-[200px] md:min-h-[280px] flex flex-col items-center justify-center">
            {/* Strikethrough items */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              {strikethroughItems.map((item, index) => (
                <span key={item} className="relative inline-block">
                  <span
                    className={`transition-all duration-500 ${
                      currentIndex >= index
                        ? "text-muted-foreground/30"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </span>
                  {/* Strikethrough line */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentIndex >= index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute left-0 top-1/2 h-[3px] w-full origin-left bg-red-500/70 md:h-[4px]"
                  />
                  {index < strikethroughItems.length - 1 && (
                    <span className="text-muted-foreground/50">,</span>
                  )}
                </span>
              ))}
            </div>

            {/* Client Keeper replacement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showClientKeeper ? 1 : 0,
                y: showClientKeeper ? 0 : 20,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8"
            >
              <h1 className="text-5xl font-extrabold tracking-tight text-gradient sm:text-6xl md:text-7xl lg:text-8xl">
                Client<span className="inline-block w-3 md:w-4"></span>Keeper<span className="inline-block w-3 md:w-4"></span>CRM.
              </h1>
            </motion.div>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showClientKeeper ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-2xl text-2xl font-semibold tracking-wide text-foreground/90 md:text-[1.75rem] leading-relaxed drop-shadow-sm"
          >
            The CRM that makes Real Estate{" "}
            <span className="relative inline-block">
              easy
              {/* Curved underline SVG - animated draw effect */}
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-3 text-accent"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 10 Q50 0 100 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showClientKeeper ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            .
            <br />
            Simple to use, zero learning curve.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: showClientKeeper ? 1 : 0,
              y: showClientKeeper ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-14 px-10 text-lg font-medium shadow-warm-lg md:h-16 md:px-12 md:text-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showClientKeeper ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
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
