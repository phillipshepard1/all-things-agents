"use client";

import { Monitor, Smartphone, BarChart3, Mic, Users, Zap, FileText, RefreshCw } from "lucide-react";

const desktopFeatures = [
  { icon: BarChart3, label: "Deep analytics & reports" },
  { icon: Users, label: "Bulk contact management" },
  { icon: FileText, label: "Advanced filtering & views" },
];

const mobileFeatures = [
  { icon: Mic, label: "Voice entry on the go" },
  { icon: Zap, label: "Quick contact updates" },
  { icon: RefreshCw, label: "Instant notifications" },
];

export function WebMobileComparison() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Best of{" "}
            <span className="text-gradient">Both Worlds</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Use desktop for deep work, mobile for quick updates.
            They work together seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Desktop Card - Highlighted */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7a36dd] to-[#5a1fb0] p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Monitor className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Desktop</h3>
                  <p className="text-sm text-white/70">Analyze & Manage</p>
                </div>
              </div>

              <p className="text-white/80 mb-8">
                Full-screen workspace for deep work. Run reports, manage your pipeline, and handle complex tasks with precision.
              </p>

              <div className="space-y-4">
                {desktopFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>Best for:</span>
                  <span className="font-medium text-white">Reports, bulk edits, deep analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7a36dd]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <Smartphone className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Mobile</h3>
                  <p className="text-sm text-gray-500">Capture & Update</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Perfect for quick updates between showings. Voice-first design means you can update your CRM without typing a single word.
              </p>

              <div className="space-y-4">
                {mobileFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <Icon className="h-4 w-4 text-gray-700" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Best for:</span>
                  <span className="font-medium text-gray-900">Field work, quick notes, voice memos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sync indicator */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full bg-white px-6 py-3 shadow-lg shadow-gray-200/50 border border-gray-100">
            <RefreshCw className="h-5 w-5 text-[#7a36dd]" />
            <span className="text-sm font-medium text-gray-900">Changes sync instantly across all devices</span>
          </div>
        </div>
      </div>
    </section>
  );
}
