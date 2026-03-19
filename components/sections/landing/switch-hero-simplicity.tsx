"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const stats = [
  { value: "20", unit: "min", label: "Setup Time" },
  { value: "$19", unit: "/mo", label: "Total Cost" },
  { value: "0", unit: "", label: "Tech Skills Needed" },
];

export function SwitchHeroSimplicity() {
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setShowStats(true), 700);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slower absolute left-1/2 top-1/4 h-[600px] w-[600px] md:h-[700px] md:w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e4d9ff]/30 via-[#c8b6ff]/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-12 pb-16 md:pt-20 md:pb-28">
        <div className="text-center">
          {/* Preheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm md:text-base font-medium text-[#7a36dd] mb-6">
              For agents who are done with overcomplicated CRMs
            </p>

            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              The CRM That Gets{" "}
              <span className="text-gradient">Out of Your Way</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              No training videos. No onboarding calls. No 50-page manual.
              <span className="block mt-2 text-foreground/80 font-medium">
                Just open it and go.
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center px-8 sm:px-10 md:px-14 ${
                  i < stats.length - 1 ? "sm:border-r sm:border-gray-200 dark:sm:border-gray-700" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: showStats ? 1 : 0, scale: showStats ? 1 : 0.8 }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.5 }}
                  className="flex items-baseline"
                >
                  <span className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl font-extrabold text-[#7a36dd]">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xl md:text-2xl font-bold text-[#7a36dd]/60 ml-1">
                      {stat.unit}
                    </span>
                  )}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showStats ? 1 : 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {stat.label}
                </motion.p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 flex flex-col items-center gap-4"
          >
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-14 px-10 text-lg font-medium shadow-warm-lg md:h-16 md:px-12 md:text-xl w-full sm:w-auto"
              >
                Try It Free
                <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
              </ShimmerButton>
            </Link>
            <p className="text-sm text-muted-foreground">
              No credit card required &bull; We&apos;ll transfer your data for you
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
