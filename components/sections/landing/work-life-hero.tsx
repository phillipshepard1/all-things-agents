"use client";

import Link from "next/link";
import { ArrowRight, Laptop, Moon, Clock, Sun, Heart, Users } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function WorkLifeHero() {
  const [showAfter, setShowAfter] = useState(false);
  const [showSubheadline, setShowSubheadline] = useState(false);
  const [hideBefore, setHideBefore] = useState(false);
  const [centerAfter, setCenterAfter] = useState(false);

  useEffect(() => {
    // Show after panel after initial load
    setTimeout(() => {
      setShowAfter(true);
    }, 800);

    // Show subheadline
    setTimeout(() => {
      setShowSubheadline(true);
    }, 1600);

    // Hide before panel after users have seen the comparison
    setTimeout(() => {
      setHideBefore(true);
    }, 4000);

    // Center the after panel
    setTimeout(() => {
      setCenterAfter(true);
    }, 4800);
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
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-[family-name:var(--font-outfit)] mb-6"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Finally, a CRM That Gives You Your Evenings Back
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-2xl text-xl font-medium text-foreground/80 md:text-2xl leading-relaxed mb-8"
          >
            MYRA handles the busywork. You handle what matters.
          </motion.p>

          {/* Before/After Split Panels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative mb-8 flex items-stretch justify-center gap-1 overflow-hidden rounded-2xl"
          >
            {/* Before Panel (Left) - Stressed at desk late at night */}
            <AnimatePresence>
              {!hideBefore && (
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    filter: "blur(8px)",
                    scale: 0.95,
                    x: -40,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="relative w-1/2 rounded-l-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-8 overflow-hidden"
                >
                  {/* Dark stressed pulse overlay */}
                  <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-red-500 pointer-events-none"
                  />

                  {/* Before visual */}
                  <div className="relative flex flex-col items-center justify-center space-y-4">
                    <div className="text-sm font-medium uppercase tracking-wider text-gray-400">
                      Before
                    </div>

                    {/* Stressed desk scene */}
                    <div className="relative h-32 w-full md:h-40">
                      {/* Laptop icon - main focus */}
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-gray-700 shadow-lg"
                      >
                        <Laptop className="h-8 w-8 md:h-10 md:w-10 text-blue-400" />
                      </motion.div>

                      {/* Clock showing 10pm */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-2 top-2 md:right-4 md:top-0 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-red-900/50 shadow-md"
                      >
                        <div className="relative">
                          <Clock className="h-6 w-6 md:h-7 md:w-7 text-red-400" />
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold text-red-400">10pm</span>
                        </div>
                      </motion.div>

                      {/* Moon icon */}
                      <motion.div
                        animate={{ rotate: [-5, 5, -5], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-2 top-0 md:left-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/50"
                      >
                        <Moon className="h-5 w-5 text-indigo-300" />
                      </motion.div>

                      {/* Notification dots - representing messages/tasks */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-4 bottom-4 h-3 w-3 rounded-full bg-red-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="absolute right-10 bottom-6 h-2 w-2 rounded-full bg-orange-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        className="absolute left-6 bottom-2 h-2.5 w-2.5 rounded-full bg-yellow-500"
                      />
                    </div>

                    <div className="text-center text-sm text-gray-400">
                      Missing Life&apos;s Moments
                    </div>
                  </div>

                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dividing line */}
            <AnimatePresence>
              {!hideBefore && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-1 bg-gradient-to-b from-gray-600 via-purple-500 to-[#7a36dd]"
                />
              )}
            </AnimatePresence>

            {/* After Panel (Right) - Family time */}
            <AnimatePresence>
              {showAfter && (
                <motion.div
                  layout
                  initial={{ x: 80, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.1,
                    layout: {
                      type: "spring",
                      stiffness: 80,
                      damping: 18
                    }
                  }}
                  className={`relative bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900 p-4 md:p-8 ${
                    centerAfter
                      ? 'w-full rounded-2xl'
                      : 'w-1/2 rounded-r-2xl'
                  }`}
                >
                  {/* After visual */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: centerAfter ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-medium uppercase tracking-wider text-[#7a36dd]"
                    >
                      After
                    </motion.div>

                    {/* Happy family scene */}
                    <div className="relative h-32 w-full md:h-40">
                      {/* Sun icon */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-2 top-0 md:left-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"
                      >
                        <Sun className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                      </motion.div>

                      {/* Heart icon - center */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 shadow-lg"
                      >
                        <Heart className="h-7 w-7 md:h-8 md:w-8 text-pink-500 fill-pink-500" />
                      </motion.div>

                      {/* Users/Family icon */}
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-2 top-2 md:right-4 md:top-0 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30"
                      >
                        <Users className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                      </motion.div>

                      {/* Soccer ball icon */}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-4 bottom-2 md:left-8 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border-2 border-gray-200 dark:border-gray-700"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" className="text-gray-800 dark:text-gray-200" />
                          <path d="M12 2a10 10 0 0 1 0 20" className="text-gray-400" />
                          <path d="M12 7l3 2.5-1 3.5H10l-1-3.5L12 7z" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
                        </svg>
                      </motion.div>

                      {/* Time indicator - "6pm" */}
                      <motion.div
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-4 bottom-4 md:right-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#7a36dd]/10"
                      >
                        <span className="text-xs font-bold text-[#7a36dd]">6pm</span>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: centerAfter ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-center text-sm text-[#7a36dd]"
                    >
                      <Heart className="h-4 w-4 fill-[#7a36dd]" />
                      Present & Peaceful
                    </motion.div>
                  </div>

                  {/* Purple overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-l from-[#7a36dd]/5 to-transparent pointer-events-none ${centerAfter ? 'rounded-2xl' : 'rounded-r-2xl'}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: showSubheadline ? 1 : 0,
              y: showSubheadline ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
            animate={{ opacity: showSubheadline ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-base text-muted-foreground md:text-lg"
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
