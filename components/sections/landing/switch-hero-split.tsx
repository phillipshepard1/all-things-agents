"use client";

import Link from "next/link";
import { ArrowRight, X, Check, AlertCircle, Sparkles } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const oldCrmItems = [
  { label: "Pipeline Management", sub: "Enterprise" },
  { label: "Drip Campaigns", sub: "Advanced" },
  { label: "Team Hierarchy", sub: "Multi-level" },
  { label: "API Integrations", sub: "200+ tools" },
  { label: "Reporting Suite", sub: "Custom SQL" },
];

const clientKeeperItems = [
  { label: "Contacts", active: true },
  { label: "Follow-ups", active: true },
  { label: "Notes & Tasks", active: true },
  { label: "MYRA AI", active: true },
];

export function SwitchHeroSplit() {
  const [showContent, setShowContent] = useState(false);
  const [showPanels, setShowPanels] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setShowPanels(true), 600);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -right-20 -top-20 h-[690px] w-[690px] md:h-[750px] md:w-[750px] rounded-full bg-gradient-to-br from-[#7a36dd]/30 via-[#9b5de5]/20 to-transparent blur-3xl" />
        <div className="animate-float-reverse absolute -bottom-32 -left-32 h-[575px] w-[575px] md:h-[625px] md:w-[625px] rounded-full bg-gradient-to-tr from-[#300092]/20 via-[#7a36dd]/15 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        {/* Top content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base font-medium text-red-500 mb-4">
            You paid for 200 features. You use 4 of them.
          </p>

          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Your CRM is{" "}
            <span className="text-gradient">Working Against You</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Complex CRMs weren&apos;t built for solo agents. Client Keeper was.
            <span className="block mt-2 text-foreground/80 font-medium">
              Switch in 20 minutes. Save $60+/month.
            </span>
          </p>
        </motion.div>

        {/* Split comparison panels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showPanels ? 1 : 0, y: showPanels ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 max-w-4xl mx-auto"
        >
          {/* Left: "Your CRM" - dark/cluttered */}
          <div className="relative rounded-2xl md:rounded-r-none bg-gray-900 p-5 md:p-6 border border-gray-700 overflow-hidden">
            {/* Noisy overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Your Current CRM
                  </span>
                </div>
                <span className="text-xs text-gray-600 font-mono">$79–299/mo</span>
              </div>

              <div className="space-y-2.5">
                {oldCrmItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showPanels ? 0.6 : 0, x: showPanels ? 0 : -10 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-800/60 border border-gray-700/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertCircle className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-sm text-gray-400">{item.label}</span>
                    </div>
                    <span className="text-[11px] text-gray-600 font-mono">{item.sub}</span>
                  </motion.div>
                ))}
              </div>

              {/* Overwhelm indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showPanels ? 1 : 0 }}
                transition={{ delay: 1 }}
                className="mt-4 flex items-center gap-2 text-gray-500"
              >
                <X className="h-4 w-4 text-red-400/60" />
                <span className="text-xs">+195 features you never touch</span>
              </motion.div>
            </div>
          </div>

          {/* Right: Client Keeper - clean/simple */}
          <div className="relative rounded-2xl md:rounded-l-none bg-white dark:bg-gray-950 p-5 md:p-6 border-2 border-[#7a36dd]/20 overflow-hidden">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#7a36dd]/8 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-[#7a36dd] uppercase tracking-wider">
                    Client Keeper
                  </span>
                </div>
                <span className="text-xs text-[#7a36dd]/60 font-mono">$19/mo</span>
              </div>

              <div className="space-y-2.5">
                {clientKeeperItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: showPanels ? 1 : 0, x: showPanels ? 0 : 10 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#F3EEFF] dark:bg-[#7a36dd]/10 border border-[#7a36dd]/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#7a36dd]" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                    <Sparkles className="h-3.5 w-3.5 text-[#7a36dd]/40" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showPanels ? 1 : 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4 flex items-center gap-2 text-[#7a36dd]/70"
              >
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-xs">Everything you need. Nothing you don&apos;t.</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link href="https://appnew.clientkeepercrm.com/register">
            <ShimmerButton
              shimmerColor="#ffffff"
              background="#7a36dd"
              borderRadius="14px"
              className="h-14 px-10 text-lg font-medium shadow-warm-lg md:h-16 md:px-12 md:text-xl"
            >
              Switch to Simple
              <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
            </ShimmerButton>
          </Link>
          <p className="text-sm text-muted-foreground">
            No credit card required &bull; 20-minute setup &bull; We transfer your data
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
