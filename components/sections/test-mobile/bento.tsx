"use client";

import { MagicSection } from "@/components/sections/magic-section";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Iphone } from "@/components/ui/iphone";
import { Filter, Bell, ArrowLeft, Camera, Image as ImageIcon, Mic, Send, Search, Plus } from "lucide-react";

// Screen Components
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

function MyraScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-2.5 pb-2 pt-5">
        <ArrowLeft className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-900">Myra</span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-2.5">
        <div className="flex justify-end">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#7a36dd] px-2.5 py-1.5 text-white">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
              <Mic className="h-2 w-2" />
            </div>
            <span className="text-[10px]">0:08</span>
          </div>
        </div>
        <div className="text-right text-[8px] text-gray-400">9:40 AM</div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl bg-gray-100 px-2.5 py-1.5">
            <p className="text-[10px] text-gray-800">I received your voice message. Let me process that.</p>
          </div>
        </div>
        <div className="text-[8px] text-gray-400">9:40 AM</div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl bg-gray-100 px-2.5 py-1.5">
            <p className="text-[10px] text-gray-800">Done! Added Sarah Johnson with follow-up for Tuesday.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 border-t border-gray-100 px-2 py-1.5">
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <Camera className="h-3.5 w-3.5" />
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
        {["All", "Buyer", "Seller"].map((filter, i) => (
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

// Bento items configuration
const bentoItems = [
  {
    title: "Smart Follow-Up Reminders",
    content: "Never let another hot lead go cold or miss a past client's birthday again. Client Keeper keeps you on top of every important touchpoint.",
    Screen: FollowUpScreen,
    fullWidth: true,
  },
  {
    title: "Effortless Data Entry",
    content: "Let Myra handle the data entry while you focus on closing deals and building relationships.",
    Screen: MyraScreen,
    fullWidth: false,
  },
  {
    title: "Manage Your Full Business",
    content: "Run your entire real estate business from one simple app - contacts, deals, tasks, and follow-ups all in one place.",
    Screen: TransactionsScreen,
    fullWidth: false,
  },
  {
    title: "Grow Your Sphere",
    content: "Turn every interaction into a lasting relationship that generates referrals for years to come.",
    Screen: ContactsScreen,
    fullWidth: true,
  },
];

export function BentoGrid() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacities = [
    useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1]),
    useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1]),
    useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1]),
    useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, 1]),
  ];

  const yTransforms = [
    useTransform(scrollYProgress, [0, 0.1, 0.3], [100, 100, 0]),
    useTransform(scrollYProgress, [0, 0.2, 0.4], [100, 100, 0]),
    useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 100, 0]),
    useTransform(scrollYProgress, [0, 0.4, 0.6], [100, 100, 0]),
  ];

  return (
    <MagicSection
      id="bento"
      title="Benefits"
      subtitle="Everything you need"
      className="mx-auto max-w-4xl px-4 sm:px-10"
      ref={ref}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bentoItems.map((item, index) => {
          const Screen = item.Screen;
          return (
            <motion.div
              key={index}
              style={{ opacity: opacities[index], y: yTransforms[index] }}
              className={cn(
                "bg-muted p-4 sm:p-6 !pb-0 rounded-3xl grid grid-rows-1",
                item.fullWidth && "md:col-span-2"
              )}
            >
              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {item.content}
                </p>
              </div>
              <div className={cn(
                "flex justify-center",
                item.fullWidth && "sm:space-x-4"
              )}>
                <div className="w-full max-w-[180px] sm:max-w-[220px]">
                  <StaticIphone>
                    <Screen />
                  </StaticIphone>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </MagicSection>
  );
}
