"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Desktop Dashboard Screen for the hero
function DashboardScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200 bg-white p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#7a36dd]" />
          <span className="text-sm font-semibold text-gray-900">Client Keeper</span>
        </div>
        <nav className="space-y-1">
          {[
            { label: "Dashboard", active: true },
            { label: "Contacts", active: false },
            { label: "Transactions", active: false },
            { label: "Follow-ups", active: false },
            { label: "Reports", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg px-3 py-2 text-sm ${
                item.active
                  ? "bg-[#7a36dd]/10 font-medium text-[#7a36dd]"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Sarah</p>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: "Active Leads", value: "24", change: "+3" },
            { label: "This Month", value: "8", change: "deals" },
            { label: "Pipeline", value: "$1.2M", change: "" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                {stat.change && (
                  <span className="text-xs font-medium text-green-600">{stat.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-medium text-gray-900">Recent Activity</div>
            <div className="space-y-2">
              {[
                { name: "Sarah Johnson", action: "moved to Closing", time: "2m ago" },
                { name: "Mike Chen", action: "new lead added", time: "15m ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#7a36dd]/20" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-500"> {item.action}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-medium text-gray-900">Tasks</div>
            <div className="space-y-2">
              {[
                { task: "Call Alex M.", time: "10:00 AM" },
                { task: "Property tour", time: "2:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded border-2 border-gray-300" />
                  <span className="flex-1 text-gray-700">{item.task}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Browser frame component
function BrowserFrame({ children, url = "app.clientkeeper.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/50">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5">
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm text-gray-600">{url}</span>
        </div>
      </div>
      {/* Content */}
      <div className="aspect-[16/10]">
        {children}
      </div>
    </div>
  );
}

export function WebAppHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-4 text-[#7a36dd] border-[#7a36dd]/30">
              <Globe className="mr-1.5 h-3.5 w-3.5" />
              Desktop & Web
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-[family-name:var(--font-outfit)]">
              Your Complete CRM,{" "}
              <span className="text-gradient">Right in Your Browser</span>
            </h1>

            <div className="max-w-xl mx-auto lg:mx-0">
              <p className="text-lg sm:text-xl text-gray-600">
                No downloads. No installation. Just sign in from any device and get full access to
                your contacts, pipeline, and AI assistant. Your real estate business, always at your fingertips.
              </p>

              <div className="mt-8 flex justify-center">
                <Button size="lg" className="bg-[#7a36dd] hover:bg-[#6a2bc7] text-white" asChild>
                  <a href="https://appnew.clientkeepercrm.com/register">Start Free Trial</a>
                </Button>
              </div>

              <p className="mt-4 text-sm text-gray-500 text-center">
                No credit card required • 30-day free trial • Cancel anytime
              </p>
            </div>
          </div>

          {/* Right: Browser mockup */}
          <div className="relative">
            {/* Glow effect behind browser */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl scale-110" />

            <div className="relative">
              <BrowserFrame>
                <DashboardScreen />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
