'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products/config';
import { MagicCard } from '@/components/ui/magic-card';
import { Globe } from 'lucide-react';

const productLogos: Record<string, string | null> = {
  'client-keeper': '/images/logos/client-keeper-logo.png',
  'atticus': '/images/logos/atticus-logo.png',
  'nicole': null, // Uses Globe icon fallback
};

const productDescriptions: Record<string, string> = {
  'client-keeper': 'The CRM built for real estate agents who hate complicated software. Manage clients, track deals, and grow your business.',
  'atticus': 'Schedule once, publish everywhere. More time for what matters—showing homes and building relationships.',
  'nicole': 'Stunning websites that showcase your listings and attract new clients.',
};

const productStatus: Record<string, 'live' | 'coming-soon'> = {
  'client-keeper': 'live',
  'atticus': 'coming-soon',
  'nicole': 'coming-soon',
};

export function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="products" ref={ref} className="py-24 bg-hub-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground mb-4">
            Our Tools
          </h2>
          <p className="text-xl text-hub-muted-foreground max-w-2xl mx-auto">
            Everything you need to run your real estate business, nothing you don&apos;t.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(products).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={`/${product.slug}/`}>
                <MagicCard
                  className="h-full p-8 bg-white border border-hub-border hover:border-hub-muted-foreground/30 transition-colors cursor-pointer"
                  gradientColor={product.colors.accent + '20'}
                >
                  <div className="flex flex-col h-full">
                    {/* Logo container - consistent height */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden"
                      style={{
                        backgroundColor: productLogos[product.id] ? 'transparent' : product.colors.accent + '15'
                      }}
                    >
                      {productLogos[product.id] ? (
                        <Image
                          src={productLogos[product.id]!}
                          alt={`${product.name} logo`}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <Globe className="h-8 w-8" style={{ color: product.colors.accent }} />
                      )}
                    </div>

                    {/* Product name */}
                    <h3 className="font-display text-2xl font-bold text-hub-foreground mb-2">
                      {product.name}
                    </h3>

                    {/* Coming Soon badge - own row, left-aligned */}
                    {productStatus[product.id] === 'coming-soon' && (
                      <div className="mb-3 flex justify-start">
                        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-hub-muted text-hub-muted-foreground">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    {/* Tagline */}
                    <p className="text-lg mb-4" style={{ color: product.colors.accent }}>
                      {product.tagline}
                    </p>

                    {/* Description - grows to fill space */}
                    <p className="text-hub-muted-foreground flex-grow">
                      {productDescriptions[product.id]}
                    </p>

                    {/* Link indicator - pushed to bottom with mt-auto */}
                    <div className="mt-auto pt-6 border-t border-hub-border">
                      <span className="text-sm font-medium text-hub-foreground">
                        {productStatus[product.id] === 'live' ? 'Learn more →' : 'View preview →'}
                      </span>
                    </div>
                  </div>
                </MagicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
