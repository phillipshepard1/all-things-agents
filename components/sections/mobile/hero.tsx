"use client";

import { motion } from "motion/react";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Filter, Bell } from "lucide-react";
import Link from "next/link";

// Apple logo SVG component for guaranteed transparency
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

// Follow Up Screen for the hero (synced with homepage)
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
      <div className="flex-1 space-y-2.5 overflow-hidden">
        {[
          { initials: "AM", name: "Aiden Martin", type: "Birthday", date: "Jun 2", color: "bg-pink-500" },
          { initials: "GM", name: "Grace Martin", type: "Housiversary", date: "Jun 3", color: "bg-purple-500" },
          { initials: "OT", name: "Owen Thompson", type: "Call", date: "Jun 4", color: "bg-green-500" },
          { initials: "VT", name: "Victoria T.", type: "Follow Up", date: "Jun 5", color: "bg-blue-500" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color} text-xs font-semibold text-white`}>
                {item.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.type}</div>
              </div>
            </div>
            <div className="shrink-0 text-xs font-medium text-gray-400">{item.date}</div>
          </div>
        ))}
      </div>
      {/* Bottom Nav */}
      <div className="mt-auto flex justify-around rounded-full bg-gray-100 py-2.5 mb-4 mx-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-4 w-4 rounded-md ${i === 2 ? "rounded-full bg-[#7a36dd]" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function MobileHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 md:pt-36 md:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-6 sm:mb-8 px-4 py-2 text-sm sm:text-base md:text-home-base font-medium text-[#7a36dd] border-[#7a36dd]/30">
              iOS & Android
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-home-5xl lg:text-home-6xl font-bold tracking-tight text-gray-900 font-[family-name:var(--font-outfit)]">
              Your CRM,{" "}
              <span className="text-gradient">Always With You</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-home-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Access your contacts, manage follow-ups, and close deals from anywhere.
              The Client Keeper mobile app puts your entire real estate business in your pocket.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="https://apps.apple.com/us/app/client-keeper-crm/id6756403940" target="_blank" rel="noopener noreferrer">
                <Button className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl md:text-home-lg font-medium bg-black hover:bg-gray-800 text-white gap-3 w-full sm:w-auto">
                  <AppleLogo className="size-7" />
                  Download for iOS
                </Button>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.clientkeeper.crm&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl md:text-home-lg font-medium gap-3 w-full sm:w-auto">
                  <Play className="size-7" />
                  Google Play
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-base sm:text-lg md:text-home-base text-muted-foreground">
              Free with your Client Keeper subscription
            </p>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[320px]">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full scale-150" />

              <Iphone15Pro className="relative w-full">
                <FollowUpScreen />
              </Iphone15Pro>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
