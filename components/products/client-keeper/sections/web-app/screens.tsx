"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ArrowLeft,
  Mic,
  Send,
  Check,
} from "lucide-react";

// Browser Frame component
function BrowserFrame({ children, url = "app.clientkeeper.com" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/50">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1">
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-500">{url}</span>
        </div>
      </div>
      <div className="aspect-[16/10] bg-gray-50">
        {children}
      </div>
    </div>
  );
}

// Dashboard Screen
function DashboardDesktopScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="Dashboard" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Active Leads", value: "24" },
            { label: "Transactions", value: "8" },
            { label: "Due Today", value: "5" },
            { label: "Closed MTD", value: "$1.2M" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white p-3 shadow-sm">
              <div className="text-[10px] text-gray-500">{s.label}</div>
              <div className="text-lg font-bold text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="text-xs font-medium text-gray-900 mb-2">Pipeline</div>
            <div className="flex gap-1">
              {["Lead", "Contact", "Showing", "Offer", "Contract", "Closed"].map((s, i) => (
                <div key={s} className="flex-1 text-center">
                  <div className={`h-16 rounded ${i === 4 ? "bg-[#7a36dd]" : "bg-gray-100"}`} />
                  <div className="mt-1 text-[8px] text-gray-500">{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="text-xs font-medium text-gray-900 mb-2">Activity</div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <div className="h-6 w-6 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-2 w-20 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contacts Screen
function ContactsDesktopScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="Contacts" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Contacts</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-gray-500">
              <Search className="h-3 w-3" />
              <span>Search...</span>
            </div>
            <button className="flex items-center gap-1 rounded-lg bg-[#7a36dd] px-2 py-1 text-xs text-white">
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {["All", "Buyers", "Sellers", "Past Clients"].map((f, i) => (
            <span key={f} className={`rounded-full px-2 py-0.5 text-[10px] ${i === 0 ? "bg-[#7a36dd] text-white" : "bg-white text-gray-600"}`}>
              {f}
            </span>
          ))}
        </div>
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
          <table className="w-full text-[10px]">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Sarah Johnson", email: "sarah@email.com", phone: "(312) 555-0101", type: "Buyer" },
                { name: "Mike Chen", email: "mike@email.com", phone: "(312) 555-0102", type: "Seller" },
                { name: "Emily Davis", email: "emily@email.com", phone: "(312) 555-0103", type: "Buyer" },
                { name: "Alex Thompson", email: "alex@email.com", phone: "(312) 555-0104", type: "Past" },
              ].map((c) => (
                <tr key={c.name} className="border-t border-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">{c.name}</td>
                  <td className="px-3 py-2 text-gray-500">{c.email}</td>
                  <td className="px-3 py-2 text-gray-500">{c.phone}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-[#7a36dd]/10 px-1.5 py-0.5 text-[#7a36dd]">{c.type}</span>
                  </td>
                  <td className="px-3 py-2"><MoreHorizontal className="h-3 w-3 text-gray-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Transactions Screen
function TransactionsDesktopScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="Transactions" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Transactions</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-gray-600">
              <Filter className="h-3 w-3" /> Filter
            </button>
            <button className="flex items-center gap-1 rounded-lg bg-[#7a36dd] px-2 py-1 text-xs text-white">
              <Plus className="h-3 w-3" /> New
            </button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { stage: "Lead", count: 5, items: ["123 Main St", "456 Oak Ave"] },
            { stage: "Showing", count: 3, items: ["789 Pine Rd"] },
            { stage: "Offer", count: 2, items: ["321 Elm St", "654 Maple Dr"] },
            { stage: "Contract", count: 4, items: ["987 Cedar Ln"] },
            { stage: "Closing", count: 2, items: ["147 Birch Way"] },
          ].map((col) => (
            <div key={col.stage} className="w-36 shrink-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{col.stage}</span>
                <span className="rounded-full bg-gray-200 px-1.5 text-[10px] text-gray-600">{col.count}</span>
              </div>
              <div className="space-y-2">
                {col.items.map((item) => (
                  <div key={item} className="rounded-lg bg-white p-2 shadow-sm text-[10px]">
                    <div className="font-medium text-gray-900">{item}</div>
                    <div className="text-gray-500">Chicago, IL</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Calendar Screen
function CalendarDesktopScreen() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="Calendar" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ChevronDown className="h-3 w-3" />
            <span>January 2025</span>
          </div>
        </div>
        <div className="rounded-lg bg-white shadow-sm p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((d) => (
              <div key={d} className="text-center text-[10px] text-gray-500">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              const isToday = day === 15;
              const hasEvent = [8, 12, 15, 22].includes(day);
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded text-[10px]",
                    day < 1 || day > 31 ? "text-gray-300" : "text-gray-700",
                    isToday && "bg-[#7a36dd] text-white"
                  )}
                >
                  {day >= 1 && day <= 31 && day}
                  {hasEvent && !isToday && <div className="h-1 w-1 rounded-full bg-[#7a36dd] mt-0.5" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reports Screen
function ReportsDesktopScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="Reports" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
          <button className="rounded-lg bg-white px-2 py-1 text-xs text-gray-600">Export</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="text-xs font-medium text-gray-900 mb-3">Monthly Closed</div>
            <div className="flex items-end gap-1 h-20">
              {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-[#7a36dd]/20" style={{ height: `${h}%` }}>
                  {i === 11 && <div className="h-full rounded-t bg-[#7a36dd]" />}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="text-xs font-medium text-gray-900 mb-3">Lead Sources</div>
            <div className="flex items-center justify-center h-20">
              <div className="relative h-16 w-16">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#7a36dd" strokeWidth="3" strokeDasharray="40 60" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-40" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MYRA Screen
function MyraDesktopScreen() {
  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar active="MYRA" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7a36dd] to-[#9b5de5] flex items-center justify-center">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">MYRA</div>
              <div className="text-[10px] text-gray-500">AI Assistant</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-auto">
          <div className="flex justify-end">
            <div className="flex items-center gap-1 rounded-2xl bg-[#7a36dd] px-3 py-1.5 text-white text-xs">
              <Mic className="h-3 w-3" /> 0:08
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-3 py-2 shadow-sm text-xs text-gray-700 max-w-[80%]">
              Got it! I&apos;ve added Sarah Johnson to your contacts with a follow-up scheduled for Tuesday.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-1 rounded-2xl bg-[#7a36dd] px-3 py-1.5 text-white text-xs">
              <Mic className="h-3 w-3" /> 0:30
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-3 py-2 shadow-sm text-xs text-gray-700 max-w-[80%]">
              Got this audio note. I&apos;m going to add this client right away.
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <button className="text-[#7a36dd]"><Mic className="h-4 w-4" /></button>
            <input className="flex-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs" placeholder="Ask MYRA anything..." />
            <button className="text-gray-400"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared Sidebar component
function Sidebar({ active }: { active: string }) {
  const items = ["Dashboard", "Contacts", "Transactions", "Calendar", "Reports", "MYRA"];
  return (
    <div className="w-32 border-r border-gray-200 bg-white p-3">
      <div className="mb-4 flex items-center gap-1.5">
        <div className="h-5 w-5 rounded bg-[#7a36dd]" />
        <span className="text-[10px] font-semibold text-gray-900">Client Keeper</span>
      </div>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <div
            key={item}
            className={cn(
              "rounded px-2 py-1.5 text-[10px]",
              active === item
                ? "bg-[#7a36dd]/10 font-medium text-[#7a36dd]"
                : "text-gray-600"
            )}
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
}

// Screen definitions
const screens = [
  { id: "dashboard", label: "Dashboard", component: DashboardDesktopScreen },
  { id: "contacts", label: "Contacts", component: ContactsDesktopScreen },
  { id: "transactions", label: "Transactions", component: TransactionsDesktopScreen },
  { id: "calendar", label: "Calendar", component: CalendarDesktopScreen },
  { id: "reports", label: "Reports", component: ReportsDesktopScreen },
  { id: "myra", label: "MYRA AI", component: MyraDesktopScreen },
];

export function WebAppScreens() {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const ActiveComponent = screens.find((s) => s.id === activeScreen)?.component || DashboardDesktopScreen;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Explore the <span className="text-gradient">Full Experience</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Click through to see every feature of Client Keeper on desktop
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Screen selector */}
          <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 w-full lg:w-auto">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={cn(
                  "shrink-0 px-5 py-3 rounded-xl text-sm font-medium transition-all",
                  activeScreen === screen.id
                    ? "bg-[#7a36dd] text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {screen.label}
              </button>
            ))}
          </div>

          {/* Browser mockup */}
          <div className="flex-1 w-full max-w-3xl">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl scale-105" />

              <div className="relative">
                <BrowserFrame url={`app.clientkeeper.com/${activeScreen}`}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <ActiveComponent />
                    </motion.div>
                  </AnimatePresence>
                </BrowserFrame>
              </div>
            </div>
          </div>

          {/* Feature highlight */}
          <div className="lg:w-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeScreen === "dashboard" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Command Center</h3>
                    <p className="text-gray-600">Everything you need at a glance. Pipeline, tasks, activity, and metrics—all in one view.</p>
                  </div>
                )}
                {activeScreen === "contacts" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Contact Database</h3>
                    <p className="text-gray-600">Search, filter, and manage your entire sphere. Bulk actions make updates fast.</p>
                  </div>
                )}
                {activeScreen === "transactions" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Pipeline</h3>
                    <p className="text-gray-600">Drag and drop transactions through stages. See your entire pipeline at a glance.</p>
                  </div>
                )}
                {activeScreen === "calendar" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrated Calendar</h3>
                    <p className="text-gray-600">Schedule showings, follow-ups, and tasks. Syncs with Google and Outlook.</p>
                  </div>
                )}
                {activeScreen === "reports" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Deep Analytics</h3>
                    <p className="text-gray-600">Track your performance over time. See what&apos;s working and optimize your business.</p>
                  </div>
                )}
                {activeScreen === "myra" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI That Works</h3>
                    <p className="text-gray-600">Ask MYRA anything. She handles data entry, finds insights, and saves you hours every week.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
