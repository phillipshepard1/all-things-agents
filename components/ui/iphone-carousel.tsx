"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Search, Plus, Filter, Check, Bell, ArrowLeft, Camera, Image, Mic, Send } from "lucide-react";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

// Mobile-optimized Screen Components
function FollowUpScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Follow up</span>
        <div className="flex gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
            <Filter className="h-2.5 w-2.5 text-gray-600" />
          </div>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7a36dd]">
            <Bell className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
      </div>

      {/* Tabs - single line */}
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] font-medium text-[#7a36dd]">This Week</span>
        <span className="text-[10px] text-gray-400">Catch Up</span>
        <span className="text-[10px] text-gray-400">Coming up</span>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { initials: "AM", name: "Aiden Martin", type: "Birthday", date: "Jun 2" },
          { initials: "GM", name: "Grace Martin", type: "Housiversary", date: "Jun 3" },
          { initials: "OT", name: "Owen Thompson", type: "Call", date: "Jun 4" },
          { initials: "VT", name: "Victoria T.", type: "Follow Up", date: "Jun 5" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7a36dd]/10 text-[9px] font-medium text-[#7a36dd]">
                {item.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-medium text-gray-900">{item.name}</div>
                <div className="text-[9px] text-gray-500">{item.type}</div>
              </div>
            </div>
            <div className="shrink-0 text-[9px] text-gray-400">{item.date}</div>
          </div>
        ))}
      </div>

      <BottomNav activeIndex={2} />
    </div>
  );
}

function TransactionsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Transactions</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] text-gray-400">Leads</span>
        <span className="text-[10px] font-medium text-[#7a36dd]">Transactions</span>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { address: "800 W Belmont", price: "$450K", stage: "Closed" },
          { address: "303 W Ohio St", price: "$1.28M", stage: "Contract" },
          { address: "1400 S Michigan", price: "$470K", stage: "Pending" },
          { address: "1 S State St", price: "$250K", stage: "Closed" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-medium text-gray-900">{item.address}</div>
              <div className="text-[9px] text-gray-500">Chicago, IL</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[11px] font-semibold text-gray-900">{item.price}</div>
              <span className="inline-block rounded-full bg-[#7a36dd]/10 px-1.5 py-0.5 text-[8px] text-[#7a36dd]">{item.stage}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeIndex={3} />
    </div>
  );
}

function LeadsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Leads</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] font-medium text-[#7a36dd]">Leads</span>
        <span className="text-[10px] text-gray-400">Transactions</span>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { initials: "CG", name: "Charlotte Gray", status: "Hot Lead" },
          { initials: "JL", name: "James Lee", status: "Warm Lead" },
          { initials: "LB", name: "Lucas Brown", status: "Warm Lead" },
          { initials: "ES", name: "Evelyn Scott", status: "New Lead" },
          { initials: "IG", name: "Isabella Green", status: "Hot Lead" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7a36dd]/10 text-[8px] font-medium text-[#7a36dd]">
                {item.initials}
              </div>
              <span className="text-[11px] font-medium text-gray-900">{item.name}</span>
            </div>
            <span className="shrink-0 rounded-full bg-[#7a36dd]/10 px-1.5 py-0.5 text-[8px] text-[#7a36dd]">{item.status}</span>
          </div>
        ))}
      </div>

      <BottomNav activeIndex={3} />
    </div>
  );
}

function TodoScreen() {
  const days = [
    { day: "M", date: 10 },
    { day: "T", date: 11 },
    { day: "W", date: 12, active: true },
    { day: "T", date: 13 },
    { day: "F", date: 14 },
  ];

  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">To-Do</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Search className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>

      {/* Day selector */}
      <div className="mb-2 flex justify-between gap-1">
        {days.map((d, i) => (
          <div key={i} className={cn(
            "flex flex-col items-center rounded-lg px-2 py-1",
            d.active ? "bg-[#7a36dd] text-white" : "bg-gray-50 text-gray-600"
          )}>
            <span className="text-[8px]">{d.day}</span>
            <span className="text-[10px] font-semibold">{d.date}</span>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { task: "Pick up staging materials", time: "9:00 AM", done: true },
          { task: "Draft listing description", time: "11:00 AM", done: false },
          { task: "Coordinate photography", time: "2:00 PM", done: false },
          { task: "Send follow-up emails", time: "4:00 PM", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
            <div className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
              item.done ? "border-[#7a36dd] bg-[#7a36dd]" : "border-gray-300 bg-white"
            )}>
              {item.done && <Check className="h-2.5 w-2.5 text-white" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className={cn("truncate text-[10px] font-medium", item.done ? "text-gray-400 line-through" : "text-gray-900")}>
                {item.task}
              </div>
              <div className="text-[8px] text-gray-400">{item.time}</div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeIndex={1} />
    </div>
  );
}

function ContactsScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Contacts</span>
        <div className="flex gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-2.5 w-2.5 text-gray-600" />
          </div>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7a36dd]">
            <Plus className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-2 flex gap-1 overflow-x-auto pb-1">
        {["All", "Buyer", "Seller", "Team"].map((filter, i) => (
          <span key={i} className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[8px] font-medium",
            i === 0 ? "bg-[#7a36dd] text-white" : "bg-gray-100 text-gray-600"
          )}>
            {filter}
          </span>
        ))}
      </div>

      {/* Contact list */}
      <div className="flex-1 space-y-2 overflow-hidden">
        <div>
          <div className="mb-1 text-[8px] font-semibold text-gray-400">A</div>
          <div className="space-y-1">
            {[
              { initials: "AM", name: "Aiden Martin", phone: "(312) 555-0101" },
              { initials: "AW", name: "Amanda Wilson", phone: "(312) 555-0102" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7a36dd]/10 text-[8px] font-medium text-[#7a36dd]">
                  {c.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[10px] font-medium text-gray-900">{c.name}</div>
                  <div className="text-[8px] text-gray-500">{c.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1 text-[8px] font-semibold text-gray-400">B</div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7a36dd]/10 text-[8px] font-medium text-[#7a36dd]">
              BL
            </div>
            <div className="min-w-0">
              <div className="truncate text-[10px] font-medium text-gray-900">Benjamin Lee</div>
              <div className="text-[8px] text-gray-500">(312) 555-0103</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeIndex={0} />
    </div>
  );
}

function MyraScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-2.5 pb-2 pt-5">
        <ArrowLeft className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-900">Myra</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-2 overflow-y-auto p-2.5">
        {/* User voice message */}
        <div className="flex justify-end">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#7a36dd] px-2.5 py-1.5 text-white">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
              <Mic className="h-2 w-2" />
            </div>
            <span className="text-[10px]">0:08</span>
          </div>
        </div>
        <div className="text-right text-[8px] text-gray-400">9:40 AM</div>

        {/* Myra response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl bg-gray-100 px-2.5 py-1.5">
            <p className="text-[10px] text-gray-800">I received your voice message. Let me process that.</p>
          </div>
        </div>
        <div className="text-[8px] text-gray-400">9:40 AM</div>

        {/* User image */}
        <div className="flex justify-end">
          <div className="overflow-hidden rounded-xl border border-[#7a36dd]/20 bg-[#7a36dd]/5 p-1">
            <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-white">
              <div className="text-center">
                <div className="text-sm">📇</div>
                <span className="text-[8px] text-gray-400">Business Card</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right text-[8px] text-gray-400">9:41 AM</div>

        {/* Myra confirmation */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl bg-gray-100 px-2.5 py-1.5">
            <p className="text-[10px] text-gray-800">Done! Added Sarah Johnson with follow-up for Tuesday.</p>
          </div>
        </div>
        <div className="text-[8px] text-gray-400">9:41 AM</div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-1 border-t border-gray-100 px-2 py-1.5">
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <Camera className="h-3.5 w-3.5" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <Image className="h-3.5 w-3.5" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <Mic className="h-3.5 w-3.5" />
        </button>
        <div className="flex-1 rounded-full border border-gray-200 px-2 py-1.5"></div>
        <button className="flex h-6 w-6 items-center justify-center text-gray-300">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mt-auto flex justify-around rounded-full bg-gray-100 py-2 mb-3 mx-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "h-3.5 w-3.5 rounded-md",
            i === activeIndex ? "rounded-full bg-[#7a36dd]" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
}

// Screen definitions
const screens = [
  { id: "followup", label: "Follow Up", component: FollowUpScreen },
  { id: "transactions", label: "Transactions", component: TransactionsScreen },
  { id: "leads", label: "Leads", component: LeadsScreen },
  { id: "todo", label: "To-Do", component: TodoScreen },
  { id: "contacts", label: "Contacts", component: ContactsScreen },
  { id: "myra", label: "Myra", component: MyraScreen },
];

export function IphoneCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  const CurrentScreen = screens[currentIndex].component;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Screen label */}
      <div className="text-center">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent sm:px-4 sm:py-1.5 sm:text-sm">
          {screens[currentIndex].label}
        </span>
      </div>

      {/* Carousel container */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
        {/* Left arrow */}
        <button
          onClick={goToPrev}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-10 sm:w-10 md:h-12 md:w-12"
          aria-label="Previous screen"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>

        {/* iPhone with content */}
        <div className="relative w-[220px] sm:w-[260px] md:w-[280px]">
          <Iphone className="w-full" />

          {/* Content overlay */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: "4.91%",
              top: "2.18%",
              width: "89.95%",
              height: "95.65%",
              borderRadius: "14.31% / 6.61%",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <CurrentScreen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-10 sm:w-10 md:h-12 md:w-12"
          aria-label="Next screen"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 sm:gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors sm:h-2.5 sm:w-2.5",
              i === currentIndex ? "bg-accent" : "bg-muted hover:bg-muted-foreground/30"
            )}
            aria-label={`Go to screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
