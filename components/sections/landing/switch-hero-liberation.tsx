"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, MessageSquare, Users, CalendarCheck } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const fadedCrms = [
  "kvCORE",
  "Follow Up Boss",
  "BoomTown",
  "LionDesk",
  "Wise Agent",
];

const phoneFeatures = [
  { icon: MessageSquare, label: "Voice Notes" },
  { icon: Users, label: "Contacts" },
  { icon: CalendarCheck, label: "Follow-ups" },
];

export function SwitchHeroLiberation() {
  const [showContent, setShowContent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setShowPhone(true), 500);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Purple gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#300092]/5 via-transparent to-transparent" />
        <div className="animate-float-slow absolute -right-20 -top-20 h-[690px] w-[690px] md:h-[750px] md:w-[750px] rounded-full bg-gradient-to-br from-[#7a36dd]/25 via-[#9b5de5]/15 to-transparent blur-3xl" />
        <div className="animate-float-reverse absolute -bottom-32 -left-32 h-[575px] w-[575px] md:h-[625px] md:w-[625px] rounded-full bg-gradient-to-tr from-[#300092]/15 via-[#7a36dd]/10 to-transparent blur-3xl" />
        <div className="animate-float-slower absolute left-1/2 top-1/3 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e4d9ff]/30 via-[#c8b6ff]/15 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm md:text-base font-medium text-[#7a36dd] mb-4">
                Life&apos;s too short for complicated software
              </p>

              <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Break Free from{" "}
                <span className="text-gradient">CRM Overload</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                You don&apos;t need a CRM built for 50-person brokerages.
                <span className="block mt-2 text-foreground/80 font-medium">
                  You need one that works the way you do.
                </span>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center lg:items-start gap-4"
            >
              <Link href="https://appnew.clientkeepercrm.com/register">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  background="#7a36dd"
                  borderRadius="14px"
                  className="h-14 px-10 text-lg font-medium shadow-warm-lg md:h-16 md:px-12 md:text-xl w-full sm:w-auto"
                >
                  Make the Switch
                  <ArrowRight className="ml-2.5 h-5 w-5 md:h-6 md:w-6" />
                </ShimmerButton>
              </Link>
              <p className="text-sm text-muted-foreground">
                No credit card required &bull; 20-minute setup &bull; We transfer your data
              </p>
            </motion.div>
          </div>

          {/* Right side - Phone rising above old CRMs */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Faded old CRM names behind/below */}
              <div className="absolute inset-x-0 bottom-0 hidden lg:flex flex-wrap justify-center gap-x-6 gap-y-2 pb-2">
                {fadedCrms.map((crm, i) => (
                  <motion.span
                    key={crm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showPhone ? 0.15 : 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="text-sm md:text-base font-semibold text-gray-400 dark:text-gray-600 line-through decoration-1"
                  >
                    {crm}
                  </motion.span>
                ))}
              </div>

              {/* Phone mockup */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: showPhone ? 1 : 0, y: showPhone ? 0 : 40 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="relative mx-auto w-[260px] md:w-[300px]">
                  {/* Phone frame */}
                  <div className="rounded-[2.5rem] bg-white dark:bg-gray-900 p-4 shadow-2xl border border-gray-100 dark:border-gray-800 ring-1 ring-gray-900/5 dark:ring-white/5">
                    {/* Status bar */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-6 w-20 rounded-full bg-gray-900 dark:bg-gray-700" />
                    </div>

                    {/* App header */}
                    <div className="flex items-center gap-2 mb-5 px-1">
                      <div className="h-8 w-8 rounded-lg bg-[#7a36dd] flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Client Keeper</p>
                        <p className="text-[10px] text-muted-foreground">Good morning, Sarah</p>
                      </div>
                    </div>

                    {/* Feature items */}
                    <div className="space-y-3">
                      {phoneFeatures.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{
                              opacity: showPhone ? 1 : 0,
                              x: showPhone ? 0 : 20,
                              scale: showPhone ? 1 : 0.95,
                            }}
                            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#F3EEFF] dark:bg-[#7a36dd]/10 border border-[#7a36dd]/10"
                          >
                            <div className="h-9 w-9 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                              <Icon className="h-4.5 w-4.5 text-[#7a36dd]" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{feature.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* MYRA prompt */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showPhone ? 1 : 0 }}
                      transition={{ delay: 1.4 }}
                      className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#7a36dd]/5 to-[#9b5de5]/5 border border-[#7a36dd]/10"
                    >
                      <p className="text-[11px] text-[#7a36dd] font-medium">MYRA</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        &quot;Welcome! Your contacts are imported and ready.&quot;
                      </p>
                    </motion.div>

                    {/* Bottom bar */}
                    <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-gray-300 dark:bg-gray-600" />
                  </div>

                  {/* Floating glow behind phone */}
                  <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-b from-[#7a36dd]/15 to-[#9b5de5]/5 blur-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
