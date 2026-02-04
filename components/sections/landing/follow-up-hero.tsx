"use client";

import Link from "next/link";
import { ArrowRight, Bell, Calendar, Gift, Phone } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface NotificationCard {
  icon: "birthday" | "followup" | "anniversary" | "call";
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

const notifications: NotificationCard[] = [
  {
    icon: "birthday",
    title: "Sarah's Birthday",
    subtitle: "Tomorrow",
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/30",
  },
  {
    icon: "followup",
    title: "Follow up: Miller Family",
    subtitle: "Check in - 2 weeks overdue",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/30",
  },
  {
    icon: "anniversary",
    title: "Anniversary: Johnson Purchase",
    subtitle: "1 Year - Next Month",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
  },
  {
    icon: "call",
    title: "Quarterly Check-in: The Browns",
    subtitle: "Schedule call this week",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
  },
];

const iconMap = {
  birthday: Gift,
  followup: Bell,
  anniversary: Calendar,
  call: Phone,
};

export function FollowUpHero() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show headline and subhead first
    setTimeout(() => setShowContent(true), 300);

    // Then stagger the notification cards
    notifications.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, 800 + index * 400);
    });
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

      <div className="container mx-auto max-w-6xl px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Pain point hook */}
              <p className="text-sm md:text-base font-medium text-red-500 mb-4">
                That client you forgot? They just signed with another agent.
              </p>

              {/* Main headline */}
              <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Never Lose Another Client to{" "}
                <span className="text-gradient">Forgetting</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Automatic reminders for every birthday, anniversary, and check-in.
                <span className="block mt-2 text-foreground/80 font-medium">
                  80% of sales happen after 5+ follow-ups. Client Keeper makes sure you never miss one.
                </span>
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 10,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center lg:items-start gap-4"
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
              {/* Trust indicators */}
              <p className="text-sm text-muted-foreground">
                No credit card required &bull; 30-day free trial &bull; Cancel anytime
              </p>
            </motion.div>
          </div>

          {/* Right side - Notification cards animation */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Phone/Device frame */}
              <div className="relative rounded-3xl bg-white dark:bg-gray-900 p-4 shadow-2xl border border-gray-100 dark:border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#7a36dd] flex items-center justify-center">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#7a36dd]">Upcoming Reminders</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>

                {/* Notification cards stack */}
                <div className="space-y-3 min-h-[280px] md:min-h-[320px]">
                  <AnimatePresence>
                    {notifications.map((notification, index) => {
                      const Icon = iconMap[notification.icon];
                      const isVisible = visibleCards.includes(index);

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 50, scale: 0.9 }}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : 50,
                            scale: isVisible ? 1 : 0.9,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl ${notification.bgColor} border border-gray-100 dark:border-gray-700`}
                        >
                          <div className={`h-10 w-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Icon className={`h-5 w-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {notification.subtitle}
                            </p>
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            className="h-2 w-2 rounded-full bg-[#7a36dd] flex-shrink-0 mt-2"
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Bottom action hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: visibleCards.length >= 3 ? 1 : 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800"
                >
                  <p className="text-xs text-center text-muted-foreground">
                    Client Keeper reminds you automatically
                  </p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 -bottom-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-400 to-[#7a36dd] opacity-20 blur-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
