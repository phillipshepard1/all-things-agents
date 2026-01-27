'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';

export default function NicoleComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">All Things Agents</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-neutral-800">Nicole</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 mb-8"
          >
            <Sparkles className="h-4 w-4 text-neutral-500" />
            <span className="text-sm font-medium text-neutral-600">Coming Soon</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-neutral-800 tracking-tight leading-[1.1] mb-6"
          >
            Beautiful websites for{' '}
            <span className="text-neutral-500">real estate agents</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-500 max-w-xl mx-auto"
          >
            Stunning websites that showcase your listings and attract new clients.
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-neutral-400">
            Part of the{' '}
            <Link href="/" className="text-neutral-600 hover:underline">
              All Things Agents
            </Link>{' '}
            suite
          </p>
        </div>
      </footer>
    </div>
  );
}
