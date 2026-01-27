'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Clock, Sparkles } from 'lucide-react';

export default function AtticusComingSoon() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE4D6 50%, #FFF8F0 100%)' }}>
      {/* Floating particles/orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF6B35]/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#2A6A8D]/10 blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#FF6B35]/5 blur-2xl animate-float-reverse" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#2A6A8D] hover:text-[#1d4d66] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">All Things Agents</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2A6A8D] flex items-center justify-center">
              <Share2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-[#2A6A8D]">Atticus</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-[#2A6A8D]/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-medium text-[#2A6A8D]">Coming Soon</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A6A8D] tracking-tight leading-[1.1] mb-6"
          >
            Social media,{' '}
            <span className="text-[#FF6B35]">simplified.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#2A6A8D]/80 mb-8 max-w-2xl mx-auto"
          >
            The #1 social scheduler for real estate agents. Schedule once, publish everywhere.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#2A6A8D]/60 mb-16"
          >
            More time for what matters—showing homes and building relationships.
          </motion.p>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Calendar, title: 'Schedule', description: 'Plan your content calendar in minutes' },
              { icon: Share2, title: 'Publish', description: 'Post to all platforms with one click' },
              { icon: Clock, title: 'Save Time', description: 'Get back hours every week' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-[#2A6A8D]/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2A6A8D]/10 flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-[#2A6A8D]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#2A6A8D] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#2A6A8D]/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm text-[#2A6A8D]/60">
            Part of the{' '}
            <Link href="/" className="text-[#2A6A8D] hover:underline">
              All Things Agents
            </Link>{' '}
            suite
          </p>
        </div>
      </footer>
    </div>
  );
}
