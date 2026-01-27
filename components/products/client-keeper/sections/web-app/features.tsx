"use client";

import {
  LayoutDashboard,
  Keyboard,
  Users,
  Filter,
  RefreshCw,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Full Dashboard View",
    description:
      "See your entire business at a glance. Pipeline, tasks, recent activity, and key metrics—all on one screen.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    description:
      "Power through your workflow with keyboard shortcuts. Navigate, search, and take action without touching your mouse.",
  },
  {
    icon: Users,
    title: "Bulk Actions",
    description:
      "Select multiple contacts or deals and update them all at once. Tag, assign, export, or delete in seconds.",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description:
      "Build complex filters to find exactly what you need. Save custom views for one-click access to your segments.",
  },
  {
    icon: RefreshCw,
    title: "Real-time Sync",
    description:
      "Changes sync instantly across all your devices. Start on desktop, continue on mobile—your data is always current.",
  },
  {
    icon: Shield,
    title: "Secure Cloud Access",
    description:
      "Bank-level encryption keeps your data safe. Access from any device, anywhere, with enterprise-grade security.",
  },
];

export function WebAppFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Desktop Power,{" "}
            <span className="text-gradient">Zero Compromise</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Built for productivity. The web app gives you the full power of Client Keeper
            with a spacious interface designed for serious work.
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
