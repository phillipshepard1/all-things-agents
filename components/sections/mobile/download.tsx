"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

// Apple logo SVG component for guaranteed transparency
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

export function MobileDownload() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#7a36dd] px-6 py-12 sm:px-16 sm:py-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-home-5xl font-bold text-white font-[family-name:var(--font-outfit)]">
              Ready to Go Mobile?
            </h2>
            <p className="mt-5 text-xl sm:text-2xl md:text-home-lg text-white/80 max-w-lg mx-auto">
              Download the Client Keeper app and take your real estate business anywhere.
              Free with your subscription.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://apps.apple.com/us/app/client-keeper-crm/id6756403940" target="_blank" rel="noopener noreferrer">
                <Button
                  className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl md:text-home-lg font-medium bg-black hover:bg-gray-800 text-white gap-3 w-full sm:w-auto"
                >
                  <AppleLogo className="size-7" />
                  Download for iOS
                </Button>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.clientkeeper.crm&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <Button
                  className="h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl md:text-home-lg font-medium bg-transparent border border-white/30 text-white hover:bg-white/10 gap-3 w-full sm:w-auto"
                >
                  <Play className="size-7" />
                  Google Play
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-base sm:text-lg md:text-home-base text-white/60">
              Don&apos;t have an account yet?{" "}
              <Link href="/#pricing" className="text-white underline underline-offset-4 hover:no-underline">
                Start your free trial
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
