'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-40 p-4 pb-safe bg-white/80 backdrop-blur-lg border-t md:hidden"
        >
          <Link
            href="https://appnew.clientkeepercrm.com/register"
            className="flex items-center justify-center w-full h-12 bg-accent text-white font-medium rounded-lg"
          >
            Start Free Trial
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
