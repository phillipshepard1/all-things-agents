"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Filter,
  Bell,
  Search,
  Plus,
  ArrowLeft,
  Camera,
  Image,
  Mic,
  Send,
  Check,
} from "lucide-react";

// Apple logo SVG component for guaranteed transparency
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

// Bottom Navigation Component
function BottomNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mt-auto flex justify-around rounded-full bg-gray-100 py-2.5 mb-4 mx-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "h-4 w-4 rounded-md",
            i === activeIndex ? "rounded-full bg-[#7a36dd]" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
}

// Contacts Screen
function ContactsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Contacts</span>
        <div className="flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a36dd]">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {["All", "Buyer", "Seller", "Team"].map((filter, i) => (
          <span
            key={filter}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
              i === 0 ? "bg-[#7a36dd] text-white" : "bg-gray-100 text-gray-600"
            )}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="flex-1 space-y-3 overflow-hidden">
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-400">A</div>
          <div className="space-y-2">
            {[
              { initials: "AM", name: "Aiden Martin", phone: "(312) 555-0101", color: "bg-blue-500" },
              { initials: "AW", name: "Amanda Wilson", phone: "(312) 555-0102", color: "bg-green-500" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${c.color} text-xs font-semibold text-white`}>
                  {c.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-400">B</div>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-xs font-semibold text-white">
              BL
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">Benjamin Lee</div>
              <div className="text-xs text-gray-500">(312) 555-0103</div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav activeIndex={0} />
    </div>
  );
}

// MYRA Voice Memo Screen
function MyraScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 pb-3 pt-12">
        <ArrowLeft className="h-5 w-5 text-gray-600" />
        <span className="text-lg font-semibold text-gray-900">Myra</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {/* User voice message */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2 rounded-2xl bg-[#7a36dd] px-4 py-2 text-white">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <Mic className="h-3 w-3" />
            </div>
            <span className="text-sm">0:08</span>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">9:40 AM</div>

        {/* Myra response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-2">
            <p className="text-sm text-gray-800">Got it! Recording your voice note about the Johnson showing.</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">9:40 AM</div>

        {/* User image upload - business card */}
        <div className="flex justify-end">
          <div className="overflow-hidden rounded-2xl border border-[#7a36dd]/20 bg-[#7a36dd]/5 p-2">
            <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-white">
              <div className="text-center">
                <div className="text-lg">📇</div>
                <span className="text-[10px] text-gray-400">Business Card</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">9:41 AM</div>

        {/* Myra confirmation */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-2">
            <p className="text-sm text-gray-800">Done! Added Sarah Johnson with follow-up for Tuesday.</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">9:41 AM</div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
        <button className="flex h-8 w-8 items-center justify-center text-gray-400">
          <Camera className="h-5 w-5" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center text-gray-400">
          <Image className="h-5 w-5" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center text-[#7a36dd]">
          <Mic className="h-5 w-5" />
        </button>
        <div className="flex-1 rounded-full border border-gray-200 px-4 py-2"></div>
        <button className="flex h-8 w-8 items-center justify-center text-gray-300">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Dashboard Screen
function DashboardScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Dashboard</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a36dd]">
          <Bell className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-purple-50 p-4 text-center">
          <div className="text-2xl font-bold text-[#7a36dd]">24</div>
          <div className="text-xs text-gray-500">Active Leads</div>
        </div>
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-xs text-gray-500">This Month</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-xs text-gray-500">Follow-Ups</div>
        </div>
        <div className="rounded-xl bg-orange-50 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">5</div>
          <div className="text-xs text-gray-500">Closings</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-500 mb-2">Quick Actions</div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#7a36dd] py-3 text-white text-sm font-medium">
            <Plus className="h-4 w-4" /> Add Contact
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-gray-700 text-sm font-medium">
            <Mic className="h-4 w-4" /> Voice Note
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex-1 overflow-hidden">
        <div className="text-sm font-medium text-gray-500 mb-2">Recent Activity</div>
        <div className="space-y-2">
          {[
            { action: "Follow-up scheduled", name: "Mike Chen", time: "2h ago" },
            { action: "Contact added", name: "Sarah J.", time: "5h ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <div>
                <div className="text-sm font-medium text-gray-900">{item.action}</div>
                <div className="text-xs text-gray-500">{item.name}</div>
              </div>
              <div className="text-xs text-gray-400">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeIndex={4} />
    </div>
  );
}

// Follow Up Screen
function FollowUpScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Follow up</span>
        <div className="flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Filter className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a36dd]">
            <Bell className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      <div className="mb-3 flex gap-4 border-b border-gray-100 pb-3">
        <span className="text-sm font-medium text-[#7a36dd]">This Week</span>
        <span className="text-sm text-gray-400">Catch Up</span>
        <span className="text-sm text-gray-400">Coming up</span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { initials: "AM", name: "Aiden Martin", type: "Birthday", date: "Jun 2", color: "bg-pink-500" },
          { initials: "GM", name: "Grace Martin", type: "Housiversary", date: "Jun 3", color: "bg-purple-500" },
          { initials: "OT", name: "Owen Thompson", type: "Call", date: "Jun 4", color: "bg-green-500" },
          { initials: "VT", name: "Victoria T.", type: "Follow Up", date: "Jun 5", color: "bg-blue-500" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-xs font-semibold text-white`}>
                {item.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.type}</div>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-400">{item.date}</div>
          </div>
        ))}
      </div>
      <BottomNav activeIndex={2} />
    </div>
  );
}

// Screen definitions for carousel
const screens = [
  { id: "contacts", label: "Contacts", component: ContactsScreen },
  { id: "voice", label: "Voice Memo", component: MyraScreen },
  { id: "dashboard", label: "Dashboard", component: DashboardScreen },
  { id: "followups", label: "Follow-Ups", component: FollowUpScreen },
];

export function MobileHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  const CurrentScreen = screens[currentIndex].component;

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

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-20 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <BlurFade delay={0.1}>
              <p className="text-sm font-medium uppercase tracking-wider text-[#7a36dd] mb-4">
                Mobile-First CRM
              </p>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A Real Estate CRM You Can Run From{" "}
                <span className="text-gradient">Anywhere</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Between showings, in the car, at the open house—Client Keeper is with you.
                Update contacts, capture leads, and never miss a follow-up.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            {/* App Store Buttons */}
            <BlurFade delay={0.5}>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="https://apps.apple.com/us/app/client-keeper-crm/id6756403940"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-white transition-all hover:bg-gray-800"
                >
                  <AppleLogo className="h-5 w-5" />
                  <span className="text-sm font-medium">App Store</span>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.clientkeeper.crm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Play className="h-5 w-5" />
                  <span className="text-sm font-medium">Google Play</span>
                </Link>
              </div>
            </BlurFade>

            <BlurFade delay={0.6}>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required &bull; 30-day free trial &bull; Cancel anytime
              </p>
            </BlurFade>
          </div>

          {/* iPhone Carousel */}
          <div className="flex-1 flex justify-center">
            <BlurFade delay={0.3}>
              <div className="flex flex-col items-center gap-6">
                {/* Screen label */}
                <div className="text-center">
                  <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                    {screens[currentIndex].label}
                  </span>
                </div>

                {/* Carousel */}
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Left arrow */}
                  <button
                    onClick={goToPrev}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-foreground"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* iPhone */}
                  <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/30 to-pink-400/20 rounded-full scale-125" />

                    <Iphone15Pro className="relative w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <CurrentScreen />
                        </motion.div>
                      </AnimatePresence>
                    </Iphone15Pro>
                  </div>

                  {/* Right arrow */}
                  <button
                    onClick={goToNext}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-foreground"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  {screens.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(i);
                      }}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-all",
                        i === currentIndex ? "bg-accent w-6" : "bg-muted hover:bg-muted-foreground/30"
                      )}
                      aria-label={`Go to screen ${i + 1}`}
                    />
                  ))}
                </div>
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
