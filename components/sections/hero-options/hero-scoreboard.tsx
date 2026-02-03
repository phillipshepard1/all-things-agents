"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const scoreboardRows = [
  { label: "Sticky Notes", status: "In Use", icon: "check" },
  { label: "Spreadsheets", status: '"Organized"', icon: "check" },
  { label: "Crossed Fingers", status: "Strategy", icon: "check" },
  { label: "Lost Revenue", status: "$???", icon: "alert", pulse: true },
];

export function HeroScoreboard() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Dark themed animated orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Deep purple orb - top right */}
        <div className="animate-float-slow absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#7a36dd]/15 via-[#300092]/10 to-transparent blur-3xl" />
        {/* Subtle blue orb - bottom left */}
        <div className="animate-float-reverse absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#1e1e3f]/30 via-[#2a2a5f]/20 to-transparent blur-3xl" />
        {/* Center glow */}
        <div className="animate-float-slower absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#7a36dd]/8 to-transparent blur-3xl" />
      </div>

      {/* Grid overlay for terminal effect */}
      <div className="absolute inset-0 -z-5 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122, 54, 221, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122, 54, 221, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Back link and option label */}
      <div className="container mx-auto max-w-4xl px-4 pt-8 md:pt-16">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/client-keeper-crm/hero-preview"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to options
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
            Option 6
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-outfit)]"
          >
            Your Current{" "}
            <span className="text-[#a78bfa]">CRM Strategy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400"
          >
            Status Report
          </motion.p>
        </div>

        {/* Scoreboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="rounded-2xl border border-gray-800 bg-[#111118]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-purple-900/10"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 px-4 md:px-8 py-4 border-b border-gray-800 bg-[#0d0d12]">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500">
              Tool
            </span>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500 text-center">
              Status
            </span>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500 text-right">
              Check
            </span>
          </div>

          {/* Data rows */}
          {scoreboardRows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.15,
                ease: "easeOut",
              }}
              className={`grid grid-cols-3 gap-4 px-4 md:px-8 py-5 md:py-6 ${
                index < scoreboardRows.length - 1
                  ? "border-b border-gray-800/50"
                  : ""
              }`}
            >
              {/* Tool name */}
              <span
                className="font-mono text-base md:text-lg text-gray-200 font-medium"
                style={{ fontFamily: "ui-monospace, 'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {row.label}
              </span>

              {/* Status */}
              <span
                className={`font-mono text-base md:text-lg text-center ${
                  row.pulse
                    ? "text-red-400"
                    : row.status === '"Organized"'
                    ? "text-yellow-400"
                    : "text-emerald-400"
                } ${row.pulse ? "animate-pulse" : ""}`}
                style={{ fontFamily: "ui-monospace, 'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {row.status}
              </span>

              {/* Check icon */}
              <div className="flex justify-end items-center">
                {row.icon === "check" ? (
                  <span className="text-emerald-400 text-lg md:text-xl">&#10003;</span>
                ) : (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-red-400 text-lg md:text-xl"
                  >
                    &#9888;
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-[family-name:var(--font-outfit)]">
            Time for an upgrade.
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white mb-10 font-[family-name:var(--font-outfit)]">
            Meet{" "}
            <span className="text-[#a78bfa]">Client Keeper</span>
            {" "}&mdash; the CRM that finally gets real estate.
          </p>

          {/* CTA */}
          <Link href="https://appnew.clientkeepercrm.com/register">
            <ShimmerButton
              shimmerColor="#a78bfa"
              background="linear-gradient(135deg, #7a36dd 0%, #9b5de5 100%)"
              borderRadius="14px"
              className="h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-medium"
            >
              Start Free Trial
              <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
            </ShimmerButton>
          </Link>

          {/* Trust indicators */}
          <p className="mt-8 text-base md:text-lg text-gray-500">
            No credit card required &bull; 30-day free trial &bull; Cancel anytime
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
