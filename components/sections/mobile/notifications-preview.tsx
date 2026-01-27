"use client";

import { motion } from "motion/react";
import { Bell, Gift, Phone, Home } from "lucide-react";

const notifications = [
  {
    icon: Gift,
    iconBg: "bg-pink-500",
    title: "Birthday Reminder",
    message: "Aiden Martin is turning 45 tomorrow",
    time: "Just now",
    delay: 0,
  },
  {
    icon: Phone,
    iconBg: "bg-orange-500",
    title: "Follow-up Overdue",
    message: "Call Sarah Johnson - 3 days overdue",
    time: "2m ago",
    delay: 0.2,
  },
  {
    icon: Home,
    iconBg: "bg-green-500",
    title: "Deal Update",
    message: "800 W Belmont moved to Closing",
    time: "5m ago",
    delay: 0.4,
  },
];

export function NotificationsPreview() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7a36dd]/10 px-4 py-2 mb-6">
              <Bell className="h-4 w-4 text-[#7a36dd]" />
              <span className="text-sm font-medium text-[#7a36dd]">Smart Notifications</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              Never Miss a{" "}
              <span className="text-gradient">Moment</span>
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              Client Keeper sends you timely reminders for the moments that matter most.
              Birthdays, housiversaries, follow-ups, and deal updates—all delivered right when you need them.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Customizable reminder timing",
                "Priority-based notifications",
                "Snooze and reschedule options",
                "Works even when offline",
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

          {/* Right: Notification Stack */}
          <div className="relative">
            {/* Phone outline hint */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl" />

            <div className="relative space-y-4 py-8">
              {notifications.map((notification, i) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: notification.delay, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-lg shadow-gray-200/50 border border-gray-100">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${notification.iconBg}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-gray-900">{notification.title}</span>
                          <span className="text-xs text-gray-400 shrink-0">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
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
