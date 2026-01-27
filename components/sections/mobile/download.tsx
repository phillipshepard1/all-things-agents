"use client";

import { Button } from "@/components/ui/button";
import { Apple, Play, QrCode } from "lucide-react";
import Link from "next/link";

export function MobileDownload() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#7a36dd] px-6 py-16 sm:px-16 sm:py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Ready to Go Mobile?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto lg:mx-0">
                Download the Client Keeper app and take your real estate business anywhere.
                Free with your subscription.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-[#7a36dd] hover:bg-white/90 gap-2"
                >
                  <Apple className="h-5 w-5" />
                  App Store
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent border border-white/30 text-white hover:bg-white/10 gap-2"
                >
                  <Play className="h-5 w-5" />
                  Google Play
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/60">
                Don&apos;t have an account yet?{" "}
                <Link href="/#pricing" className="text-white underline underline-offset-4 hover:no-underline">
                  Start your free trial
                </Link>
              </p>
            </div>

            {/* Right - QR code area */}
            <div className="hidden lg:flex justify-center">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center h-40 w-40 mx-auto bg-gray-100 rounded-xl mb-4">
                  <QrCode className="h-24 w-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">
                  Scan to download
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
