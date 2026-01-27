"use client";

import { MagicSection } from "@/components/sections/magic-section";
import { easeInOutCubic } from "@/lib/animation";
import { motion, useScroll, useTransform } from "motion/react";
import { Iphone } from "@/components/ui/iphone";
import { Filter, Bell, Search, Plus, Check, ArrowLeft, Camera, Image as ImageIcon, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Compact screen components for static display
function FollowUpScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pt-5">
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
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] font-medium text-[#7a36dd]">This Week</span>
        <span className="text-[10px] text-gray-400">Catch Up</span>
        <span className="text-[10px] text-gray-400">Coming up</span>
      </div>
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
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Transactions</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] text-gray-400">Leads</span>
        <span className="text-[10px] font-medium text-[#7a36dd]">Transactions</span>
      </div>
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
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Leads</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Filter className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>
      <div className="mb-2 flex gap-3 border-b border-gray-100 pb-2">
        <span className="text-[10px] font-medium text-[#7a36dd]">Leads</span>
        <span className="text-[10px] text-gray-400">Transactions</span>
      </div>
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
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">To-Do</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
          <Search className="h-2.5 w-2.5 text-gray-600" />
        </div>
      </div>
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

// Static iPhone with screen content
function StaticIphone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Iphone className="w-full" />
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
        {children}
      </div>
    </div>
  );
}

// Screen components array for easy reference
const screens = [
  { id: "followup", component: FollowUpScreen },
  { id: "transactions", component: TransactionsScreen },
  { id: "leads", component: LeadsScreen },
  { id: "todo", component: TodoScreen },
  { id: "contacts", component: ContactsScreen },
];

export function Hero() {
  const { scrollY } = useScroll({
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollY, [0, 300], [100, 0]);
  const y2 = useTransform(scrollY, [0, 300], [50, 0]);
  const y3 = useTransform(scrollY, [0, 300], [0, 0]);
  const y4 = useTransform(scrollY, [0, 300], [50, 0]);
  const y5 = useTransform(scrollY, [0, 300], [100, 0]);

  const yTransforms = [y1, y2, y3, y4, y5];

  return (
    <MagicSection id="hero" className="min-h-[100vh] w-full overflow-hidden">
      <main className="mx-auto pt-16 sm:pt-24 md:pt-32 text-center relative px-4">
        <div className="relative">
          <motion.div
            initial={{ scale: 4.5, height: "80vh" }}
            animate={{ scale: 1, height: "10vh" }}
            transition={{
              scale: { delay: 0, duration: 1.8, ease: easeInOutCubic },
              height: { delay: 0, duration: 1.8, ease: easeInOutCubic },
            }}
            className="mb-16 relative z-20"
            style={{ transformOrigin: "top" }}
          >
            <div className="bg-accent text-white text-xl font-bold p-4 h-20 w-20 flex items-center justify-center rounded-3xl mx-auto shadow-md">
              <span className="text-3xl font-bold">CK</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute inset-0 top-20 z-10 text-lg font-semibold text-accent"
          >
            Client Keeper
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeInOutCubic }}
            className="text-4xl sm:text-5xl font-bold mb-4 tracking-tighter text-gradient"
          >
            The CRM Real Estate Agents Love
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easeInOutCubic }}
            className="max-w-2xl mx-auto text-lg sm:text-xl mb-8 font-medium text-balance text-muted-foreground"
          >
            Client Keeper helps you manage contacts, follow-ups, and deals all in one simple app. Stop losing leads and start closing more deals.
          </motion.p>
          <div className="flex justify-center gap-4 mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex gap-3"
            >
              <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90">
                Start Free Trial
              </button>
              <button className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8 h-auto sm:h-[500px] select-none overflow-x-auto px-4">
          {screens.map((screen, index) => {
            const Screen = screen.component;
            return (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, x: index < 2 ? -200 + index * 100 : index > 2 ? 200 - (4 - index) * 100 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: yTransforms[index] }}
                transition={{ duration: 1, delay: 1 }}
                className="w-32 sm:w-48 md:w-64 flex-shrink-0"
              >
                <StaticIphone>
                  <Screen />
                </StaticIphone>
              </motion.div>
            );
          })}
        </div>
      </main>
    </MagicSection>
  );
}
