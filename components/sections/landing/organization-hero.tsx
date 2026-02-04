"use client";

import Link from "next/link";
import { ArrowRight, StickyNote, Table2, HelpCircle, X, Users, Phone, Clock, Mail, MessageSquare, Calendar } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const strikethroughItems = [
  "Sticky Notes",
  "Spreadsheets",
  "Crossed Fingers",
  "Lost Leads",
];

export function OrganizationHero() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showClientKeeper, setShowClientKeeper] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [showSubheadline, setShowSubheadline] = useState(false);
  const [hideChaos, setHideChaos] = useState(false);
  const [centerDashboard, setCenterDashboard] = useState(false);

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

    // Show split panels 500ms after Client Keeper
    setTimeout(() => {
      setShowSplit(true);
    }, 3900);

    // Show subheadline after split panels have appeared
    setTimeout(() => {
      setShowSubheadline(true);
    }, 4400);

    // Hide chaos panel after 2.5 seconds (longer to appreciate the animation)
    setTimeout(() => {
      setHideChaos(true);
    }, 6400);

    // Center the dashboard
    setTimeout(() => {
      setCenterDashboard(true);
    }, 7400);
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
          {/* Sound Familiar hook - matches ad copy */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Sticky notes. Spreadsheets. Crossed fingers. Sound familiar?
          </motion.p>

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
                Client<span className="inline-block w-3 md:w-4"></span>Keeper.
              </h1>
            </motion.div>
          </div>

          {/* Before/After Split Panels */}
          <AnimatePresence>
            {showSplit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative mb-8 flex items-stretch justify-center gap-1 overflow-hidden rounded-2xl"
              >
                {/* Chaos Panel (Left) */}
                <AnimatePresence>
                  {!hideChaos && (
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
                      className="relative w-1/2 rounded-l-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 overflow-hidden"
                    >
                      {/* Red stress pulse overlay */}
                      <motion.div
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-red-500 pointer-events-none"
                      />

                      {/* Chaos visual */}
                      <div className="relative flex flex-col items-center justify-center space-y-4">
                        <div className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Before
                        </div>

                        {/* Scattered elements */}
                        <div className="relative h-32 w-full md:h-40">
                          {/* Sticky notes scattered */}
                          <motion.div
                            animate={{ rotate: [-8, 8, -8], y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-2 top-2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded bg-yellow-300 shadow-md"
                          >
                            <StickyNote className="h-5 w-5 md:h-6 md:w-6 text-yellow-700" />
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [10, -6, 10], scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-4 top-0 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded bg-pink-300 shadow-md"
                          >
                            <StickyNote className="h-4 w-4 md:h-5 md:w-5 text-pink-700" />
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [-4, 6, -4] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-1/4 top-8 flex h-8 w-8 items-center justify-center rounded bg-blue-200 shadow-md"
                          >
                            <StickyNote className="h-4 w-4 text-blue-600" />
                          </motion.div>

                          {/* Spreadsheet icon */}
                          <motion.div
                            animate={{ y: [0, -5, 0], rotate: [0, 3, 0] }}
                            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-2 left-6 md:left-8 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-green-100 shadow-md dark:bg-green-900"
                          >
                            <Table2 className="h-6 w-6 md:h-7 md:w-7 text-green-600 dark:text-green-400" />
                          </motion.div>

                          {/* Email icon */}
                          <motion.div
                            animate={{ rotate: [5, -5, 5], y: [0, 2, 0] }}
                            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-2 bottom-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 shadow-md dark:bg-blue-900"
                          >
                            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </motion.div>

                          {/* Calendar with X */}
                          <motion.div
                            animate={{ scale: [1, 1.08, 1], rotate: [-3, 3, -3] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-1/3 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100 shadow-md dark:bg-orange-900 overflow-hidden"
                          >
                            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <X className="absolute h-7 w-7 text-red-500/70" />
                          </motion.div>

                          {/* Question marks */}
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-6 bottom-14"
                          >
                            <HelpCircle className="h-7 w-7 md:h-8 md:w-8 text-red-400" />
                          </motion.div>

                          {/* X marks */}
                          <motion.div
                            animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <X className="h-9 w-9 md:h-10 md:w-10 text-red-500" />
                          </motion.div>
                        </div>

                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                          Mental Overload
                        </div>
                      </div>

                      {/* Red overlay gradient */}
                      <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dividing line */}
                <AnimatePresence>
                  {!hideChaos && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-1 bg-gradient-to-b from-gray-400 via-purple-500 to-[#7a36dd]"
                    />
                  )}
                </AnimatePresence>

                {/* Clean Dashboard Panel (Right) */}
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
                  className={`relative bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900 p-4 md:p-6 ${
                    centerDashboard
                      ? 'w-full rounded-2xl'
                      : 'w-1/2 rounded-r-2xl'
                  }`}
                >
                  {/* Clean visual */}
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: centerDashboard ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-medium uppercase tracking-wider text-[#7a36dd]"
                    >
                      After
                    </motion.div>

                    {/* Enhanced dashboard mockup */}
                    <motion.div
                      layout
                      className={`relative w-full rounded-xl bg-white shadow-xl dark:bg-gray-800 overflow-hidden ${
                        centerDashboard ? 'max-w-sm' : 'max-w-xs'
                      }`}
                    >
                      {/* Header with branding */}
                      <div className="flex items-center border-b border-gray-100 dark:border-gray-700 px-4 py-2.5 bg-gradient-to-r from-[#7a36dd]/5 to-transparent">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7a36dd]">
                            <Users className="h-3.5 w-3.5 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-[#7a36dd]">Client Keeper</span>
                        </div>
                      </div>

                      {/* Contact card */}
                      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-[#7a36dd] text-white font-semibold text-sm flex-shrink-0">
                            SJ
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Sarah Johnson</span>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <Phone className="h-3 w-3" />
                              <span>+1 (555) 123-4567</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next follow-up indicator */}
                      <div className="px-3 py-2 bg-purple-50/50 dark:bg-purple-900/20 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-[#7a36dd]" />
                            <span className="text-xs font-medium text-[#7a36dd]">Next Follow-up</span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Call in 1 week</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-2 text-center">
                          <div className="text-base font-bold text-[#7a36dd]">24</div>
                          <div className="text-[9px] text-gray-500">Contacts</div>
                        </div>
                        <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-2 text-center">
                          <div className="text-base font-bold text-green-600">12</div>
                          <div className="text-[9px] text-gray-500">Tasks</div>
                        </div>
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-2 text-center">
                          <div className="text-base font-bold text-blue-600">5</div>
                          <div className="text-[9px] text-gray-500">Closings</div>
                        </div>
                      </div>

                      {/* Activity timeline */}
                      <div className="p-3">
                        <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-2">Recent Activity</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                              <Mail className="h-2.5 w-2.5 text-blue-600" />
                            </div>
                            <span className="text-[11px] text-gray-600 dark:text-gray-300">Email sent to Mike</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                              <MessageSquare className="h-2.5 w-2.5 text-purple-600" />
                            </div>
                            <span className="text-[11px] text-gray-600 dark:text-gray-300">Note added for Lisa</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: centerDashboard ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-center text-sm text-[#7a36dd]"
                    >
                      <Users className="h-4 w-4" />
                      Total Clarity
                    </motion.div>
                  </div>

                  {/* Purple overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-l from-[#7a36dd]/5 to-transparent pointer-events-none ${centerDashboard ? 'rounded-2xl' : 'rounded-r-2xl'}`} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showSubheadline ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-2xl font-semibold tracking-wide text-foreground/90 md:text-[1.75rem] leading-relaxed drop-shadow-sm"
          >
            From{" "}
            <span className="relative inline-block">
              chaos
              {/* Curved underline SVG - animated draw effect */}
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-3 text-red-400"
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
                  animate={{ pathLength: showSubheadline ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            {" "}to{" "}
            <span className="relative inline-block">
              calm
              {/* Curved underline SVG - animated draw effect */}
              <motion.svg
                className="absolute -bottom-1 left-0 w-full h-3 text-[#7a36dd]"
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
                  animate={{ pathLength: showSubheadline ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            {" "}in one simple app.
          </motion.p>

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
