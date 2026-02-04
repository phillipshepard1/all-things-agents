"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";

// Voice waveform animation bars
function VoiceWaveform() {
  const barCount = 24;
  const bars = Array.from({ length: barCount }, (_, i) => {
    // Create a natural speech-like pattern
    const baseHeight = Math.sin((i / barCount) * Math.PI) * 0.6 + 0.4;
    return {
      height: baseHeight,
      delay: i * 0.05,
    };
  });

  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#7a36dd] rounded-full"
          initial={{ height: "8px" }}
          animate={{
            height: ["8px", `${bar.height * 40 + 8}px`, "8px"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Simple app mockup showing voice note interface
function VoiceNoteAppScreen() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Status bar placeholder */}
      <div className="h-12 bg-white" />

      {/* App header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[#7a36dd] flex items-center justify-center">
            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">Client Keeper</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 space-y-4">
        {/* Contact card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-[#7a36dd] flex items-center justify-center text-white font-semibold">
              SM
            </div>
            <div>
              <p className="font-semibold text-gray-900">Sarah Mitchell</p>
              <p className="text-xs text-gray-500">Just showed 123 Oak Lane</p>
            </div>
          </div>
        </div>

        {/* Voice note recording UI */}
        <div className="bg-gradient-to-br from-[#7a36dd]/5 to-purple-50 rounded-xl p-4 border border-[#7a36dd]/10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-12 w-12 rounded-full bg-[#7a36dd] flex items-center justify-center"
            >
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
              </svg>
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#7a36dd]">Recording...</p>
              <p className="text-xs text-gray-500">0:12</p>
            </div>
          </div>

          {/* Waveform */}
          <VoiceWaveform />

          {/* Transcript preview */}
          <div className="mt-4 pt-4 border-t border-[#7a36dd]/10">
            <p className="text-xs font-medium text-gray-500 mb-1">MYRA is transcribing...</p>
            <p className="text-sm text-gray-700 italic">
              &quot;Sarah loved the kitchen, wants to see more homes in Oak Hills...&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VoiceNoteHero() {
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

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          {/* Left column - Copy */}
          <div className="text-center md:text-left order-2 md:order-1">
            <BlurFade delay={0.1}>
              <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Your CRM,{" "}
                <span className="text-gradient">Without the Tech Overwhelm</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.2}>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
                Between showings, send a voice note. MYRA handles the rest.
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="https://appnew.clientkeepercrm.com/register">
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    background="#7a36dd"
                    borderRadius="14px"
                    className="h-14 px-10 text-lg font-medium shadow-warm-lg w-full sm:w-auto"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ShimmerButton>
                </Link>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required &bull; 30-day free trial &bull; Cancel anytime
              </p>
            </BlurFade>
          </div>

          {/* Right column - Phone mockup */}
          <div className="order-1 md:order-2 flex justify-center">
            <BlurFade delay={0.2} direction="left">
              <div className="relative">
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 scale-95 rounded-[3rem] bg-gradient-to-br from-[#7a36dd]/20 to-purple-300/20 blur-2xl" />

                <Iphone15Pro className="relative w-[280px] sm:w-[320px] md:w-[300px] lg:w-[340px]">
                  <VoiceNoteAppScreen />
                </Iphone15Pro>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
