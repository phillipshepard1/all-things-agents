"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
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

// Bottom Navigation Component (matches homepage)
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

// Follow Up Screen (synced with homepage)
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

// Transactions Screen (synced with homepage - renamed from Deals)
function TransactionsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Transactions</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <div className="mb-3 flex gap-4 border-b border-gray-100 pb-3">
        <span className="text-sm text-gray-400">Leads</span>
        <span className="text-sm font-medium text-[#7a36dd]">Transactions</span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { address: "800 W Belmont", price: "$450K", stage: "Closed", color: "bg-green-500" },
          { address: "303 W Ohio St", price: "$1.28M", stage: "Contract", color: "bg-blue-500" },
          { address: "1400 S Michigan", price: "$470K", stage: "Pending", color: "bg-yellow-500" },
          { address: "1 S State St", price: "$250K", stage: "Closed", color: "bg-green-500" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900">{item.address}</div>
              <div className="text-xs text-gray-500">Chicago, IL</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-semibold text-gray-900">{item.price}</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                {item.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav activeIndex={3} />
    </div>
  );
}

// Leads Screen (new - from homepage)
function LeadsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Leads</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <div className="mb-3 flex gap-4 border-b border-gray-100 pb-3">
        <span className="text-sm font-medium text-[#7a36dd]">Leads</span>
        <span className="text-sm text-gray-400">Transactions</span>
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
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { initials: "CG", name: "Charlotte Gray", status: "Hot Lead", color: "bg-red-500" },
          { initials: "JL", name: "James Lee", status: "Warm Lead", color: "bg-orange-500" },
          { initials: "LB", name: "Lucas Brown", status: "Warm Lead", color: "bg-orange-500" },
          { initials: "ES", name: "Evelyn Scott", status: "New Lead", color: "bg-blue-500" },
          { initials: "IG", name: "Isabella Green", status: "Hot Lead", color: "bg-red-500" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-xs font-semibold text-white`}>
                {item.initials}
              </div>
              <span className="text-sm font-medium text-gray-900">{item.name}</span>
            </div>
            <span className="shrink-0 rounded-full bg-[#7a36dd]/10 px-2 py-1 text-xs font-medium text-[#7a36dd]">
              {item.status}
            </span>
          </div>
        ))}
      </div>
      <BottomNav activeIndex={3} />
    </div>
  );
}

// To-Do Screen (synced with homepage)
function TodoScreen() {
  const days = [
    { day: "M", date: 10 },
    { day: "T", date: 11 },
    { day: "W", date: 12, active: true },
    { day: "T", date: 13 },
    { day: "F", date: 14 },
  ];

  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">To-Do</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Search className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <div className="mb-3 flex justify-between gap-1">
        {days.map((d, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col items-center rounded-lg px-3 py-2",
              d.active ? "bg-[#7a36dd] text-white" : "bg-gray-50 text-gray-600"
            )}
          >
            <span className="text-[10px]">{d.day}</span>
            <span className="text-sm font-semibold">{d.date}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { task: "Pick up staging materials", time: "9:00 AM", done: true },
          { task: "Draft listing description", time: "11:00 AM", done: false },
          { task: "Coordinate photography", time: "2:00 PM", done: false },
          { task: "Send follow-up emails", time: "4:00 PM", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border-2",
                item.done
                  ? "border-[#7a36dd] bg-[#7a36dd]"
                  : "border-gray-300 bg-white"
              )}
            >
              {item.done && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className={cn("text-sm font-medium", item.done ? "text-gray-400 line-through" : "text-gray-900")}>
                {item.task}
              </div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav activeIndex={1} />
    </div>
  );
}

// Contacts Screen (synced with homepage - alphabetical with phone numbers)
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
        {/* Section A */}
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
        {/* Section B */}
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

// MYRA Screen (synced with homepage - business card flow)
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
            <p className="text-sm text-gray-800">I received your voice message. Let me process that.</p>
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

      {/* Input bar with Image button */}
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

// Screen definitions (now 6 screens to match homepage)
const screens = [
  { id: "followup", label: "Follow Up", component: FollowUpScreen },
  { id: "transactions", label: "Transactions", component: TransactionsScreen },
  { id: "leads", label: "Leads", component: LeadsScreen },
  { id: "todo", label: "To-Do", component: TodoScreen },
  { id: "contacts", label: "Contacts", component: ContactsScreen },
  { id: "myra", label: "Myra", component: MyraScreen },
];

export function MobileScreens() {
  const [activeScreen, setActiveScreen] = useState("followup");

  const ActiveComponent = screens.find((s) => s.id === activeScreen)?.component || FollowUpScreen;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            See It In Action
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the key screens of Client Keeper mobile
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

          {/* Phone mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[280px] sm:w-[320px]">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full scale-150" />

              <Iphone15Pro className="relative w-full">
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
              </Iphone15Pro>
            </div>
          </div>

          {/* Feature highlight for selected screen */}
          <div className="lg:w-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeScreen === "followup" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Never Drop the Ball</h3>
                    <p className="text-gray-600">Smart reminders for birthdays, housiversaries, and follow-ups. Build relationships that generate referrals.</p>
                  </div>
                )}
                {activeScreen === "transactions" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Every Deal</h3>
                    <p className="text-gray-600">See your entire pipeline at a glance. Track progress from lead to close with custom stages.</p>
                  </div>
                )}
                {activeScreen === "leads" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualify & Convert</h3>
                    <p className="text-gray-600">Score leads automatically. Focus your energy on the hottest prospects ready to transact.</p>
                  </div>
                )}
                {activeScreen === "todo" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Organized</h3>
                    <p className="text-gray-600">Never miss a to-do. View your tasks by day, week, or priority. Check them off on the go.</p>
                  </div>
                )}
                {activeScreen === "contacts" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Entire Sphere</h3>
                    <p className="text-gray-600">Access all your contacts with lightning-fast search. Filter by type, tag, or any custom field. Works offline too.</p>
                  </div>
                )}
                {activeScreen === "myra" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your AI Assistant</h3>
                    <p className="text-gray-600">Just talk to MYRA. She&apos;ll handle data entry, schedule follow-ups, and keep your CRM up to date automatically.</p>
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
