"use client";

import { motion } from "motion/react";
import {
  Mic,
  Bell,
  Users,
  FileText,
  Smartphone,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice-First Design",
    description:
      "Just talk to MYRA. Record a voice memo about a client interaction and she handles the rest.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Never miss a follow-up. Get timely reminders for birthdays, anniversaries, and check-ins.",
  },
  {
    icon: Users,
    title: "Full Contact Access",
    description:
      "All your contacts, notes, and history available offline. Search and filter instantly.",
  },
  {
    icon: FileText,
    title: "Deal Tracking",
    description:
      "Track every transaction from lead to close. See your pipeline at a glance.",
  },
  {
    icon: Smartphone,
    title: "Native Experience",
    description:
      "Built natively for iOS and Android. Fast, responsive, and feels right at home.",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description:
      "Changes sync across all your devices in real-time. Start on mobile, continue on desktop.",
  },
];

export function MobileFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Everything You Need,{" "}
            <span className="text-gradient">On the Go</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The full power of Client Keeper, optimized for mobile. Work from
            anywhere without compromise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7a36dd]/10 text-[#7a36dd] mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
