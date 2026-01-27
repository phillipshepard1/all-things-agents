"use client";

import { motion } from "motion/react";
import { LayoutDashboard, TrendingUp, Users, Calendar } from "lucide-react";

const dashboardCards = [
  {
    icon: TrendingUp,
    iconBg: "bg-green-500",
    title: "Pipeline Value",
    value: "$2.4M",
    subtitle: "12 active transactions",
    delay: 0,
  },
  {
    icon: Users,
    iconBg: "bg-blue-500",
    title: "Active Leads",
    value: "47",
    subtitle: "8 hot leads this week",
    delay: 0.2,
  },
  {
    icon: Calendar,
    iconBg: "bg-orange-500",
    title: "Tasks Today",
    value: "6",
    subtitle: "2 high priority",
    delay: 0.4,
  },
];

export function DashboardPreview() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7a36dd]/10 px-4 py-2 mb-6">
              <LayoutDashboard className="h-4 w-4 text-[#7a36dd]" />
              <span className="text-sm font-medium text-[#7a36dd]">Command Center</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              Your Business at a{" "}
              <span className="text-gradient">Glance</span>
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              The dashboard puts everything you need front and center. Track your pipeline,
              monitor leads, and stay on top of tasks—all without clicking away.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Customizable dashboard widgets",
                "Real-time pipeline metrics",
                "Quick actions from anywhere",
                "Daily/weekly performance snapshots",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7a36dd]/10">
                    <svg className="h-4 w-4 text-[#7a36dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Dashboard Cards */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl" />

            <div className="relative space-y-4 py-8">
              {dashboardCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: card.delay, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-gray-200/50 border border-gray-100">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-500">{card.title}</div>
                        <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                        <div className="text-sm text-gray-400">{card.subtitle}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
