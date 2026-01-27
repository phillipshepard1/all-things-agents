"use client";

import { MagicSection } from "@/components/sections/magic-section";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";
import { ArrowLeft, Camera, Image as ImageIcon, Mic, Send, Filter, Bell, Search, Plus } from "lucide-react";

// Myra Screen
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
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl bg-gray-100 px-2.5 py-1.5">
            <p className="text-[10px] text-gray-800">Done! Added Sarah Johnson with follow-up for Tuesday.</p>
          </div>
        </div>
        <div className="text-[8px] text-gray-400">9:41 AM</div>
      </div>
      <div className="flex items-center gap-1 border-t border-gray-100 px-2 py-1.5">
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <Camera className="h-3.5 w-3.5" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center text-gray-400">
          <ImageIcon className="h-3.5 w-3.5" />
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

// Follow Up Screen (compact)
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

// Contacts Screen (compact)
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

// Static iPhone component
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

export function FeatureScroll() {
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: phone1Ref,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: phone2Ref,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: phone3Ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress1, [0, 0.3], [150, 0]);
  const y2 = useTransform(scrollYProgress2, [0.1, 0.4], [200, 0]);
  const y3 = useTransform(scrollYProgress3, [0.2, 0.5], [250, 0]);

  return (
    <MagicSection
      id="feature-scroll"
      title="Experience"
      subtitle="An app unlike any other"
      className="container px-4 sm:px-10 mx-auto max-w-6xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-auto select-none">
        <motion.div
          ref={phone1Ref}
          className="w-full h-auto -z-10 max-w-[200px] sm:max-w-[250px] mx-auto"
          style={{ y: y1 }}
        >
          <StaticIphone>
            <MyraScreen />
          </StaticIphone>
        </motion.div>
        <motion.div
          ref={phone2Ref}
          className="w-full h-auto -z-10 max-w-[200px] sm:max-w-[250px] mx-auto"
          style={{ y: y2 }}
        >
          <StaticIphone>
            <FollowUpScreen />
          </StaticIphone>
        </motion.div>
        <motion.div
          ref={phone3Ref}
          className="w-full h-auto -z-10 max-w-[200px] sm:max-w-[250px] mx-auto"
          style={{ y: y3 }}
        >
          <StaticIphone>
            <ContactsScreen />
          </StaticIphone>
        </motion.div>
      </div>
    </MagicSection>
  );
}
