"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface StickyNote {
  id: number;
  text: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  scale: number;
}

const stickyNotes: StickyNote[] = [
  { id: 1, text: "Call Mike!!!", color: "#fef08a", rotation: -8, x: 5, y: 10, scale: 1 },
  { id: 2, text: "Follow up!", color: "#fda4af", rotation: 12, x: 75, y: 5, scale: 0.9 },
  { id: 3, text: "Q3 Leads???", color: "#93c5fd", rotation: -5, x: 85, y: 45, scale: 1.1 },
  { id: 4, text: "Email Sarah", color: "#fef08a", rotation: 15, x: 10, y: 60, scale: 0.95 },
  { id: 5, text: "Open house Sat", color: "#a5f3fc", rotation: -12, x: 70, y: 75, scale: 1 },
  { id: 6, text: "Contract due!", color: "#fda4af", rotation: 6, x: 20, y: 35, scale: 1.05 },
  { id: 7, text: "Call back?", color: "#93c5fd", rotation: -3, x: 60, y: 20, scale: 0.85 },
  { id: 8, text: "New listing", color: "#fef08a", rotation: 10, x: 45, y: 65, scale: 0.9 },
  { id: 9, text: "Closing docs", color: "#a5f3fc", rotation: -15, x: 30, y: 80, scale: 1 },
  { id: 10, text: "WHERE???", color: "#fda4af", rotation: 8, x: 50, y: 10, scale: 1.1 },
];

export function HeroStickyWall() {
  const [showNotes, setShowNotes] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Animate notes away after 3 seconds
    const timer = setTimeout(() => {
      setShowNotes(false);
      setHasAnimated(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* Sticky notes scattered background */}
      <AnimatePresence>
        {showNotes && (
          <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
            {stickyNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: note.scale,
                  rotate: note.rotation,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  y: -100,
                  rotate: note.rotation + 30,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeInOut"
                  }
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "backOut"
                }}
                className="absolute w-24 h-24 md:w-32 md:h-32 p-3 md:p-4 shadow-lg"
                style={{
                  left: `${note.x}%`,
                  top: `${note.y}%`,
                  backgroundColor: note.color,
                  fontFamily: "var(--font-caveat)",
                }}
              >
                <span className="text-gray-700 text-lg md:text-2xl font-medium leading-tight">
                  {note.text}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-6xl px-4 pt-8 md:pt-16 pb-16 md:pb-36">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Option Label */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
              Option 3: The Sticky Wall
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

          {/* Main Headline */}
          <motion.div
            className="font-[family-name:var(--font-outfit)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {showNotes ? (
                <motion.h1
                  key="chaos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-muted-foreground"
                >
                  This is your{" "}
                  <span className="inline-block" style={{ fontFamily: "var(--font-caveat)" }}>
                    &quot;system&quot;
                  </span>
                </motion.h1>
              ) : (
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-gradient">
                    There&apos;s a better way.
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="mx-auto mt-10 max-w-2xl text-xl md:text-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasAnimated ? 1 : 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Meet Client Keeper — the CRM that finally gets real estate.
            Simple to use, zero learning curve, and actually helps you close more deals.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
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
            className="mt-12 text-lg md:text-home-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            No credit card required &bull; 30-day free trial &bull; Cancel anytime
          </motion.p>

          {/* Replay button */}
          {hasAnimated && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                setShowNotes(true);
                setHasAnimated(false);
                setTimeout(() => {
                  setShowNotes(false);
                  setHasAnimated(true);
                }, 3000);
              }}
              className="mt-8 text-sm text-muted-foreground hover:text-accent transition-colors underline"
            >
              Replay animation
            </motion.button>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
