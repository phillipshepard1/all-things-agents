'use client';

import { useRouter } from 'next/navigation';
import { products } from '@/lib/products/config';
import { MagicCard } from '@/components/ui/magic-card';
import { Users, Share2, Globe, Building2 } from 'lucide-react';

const productIcons: Record<string, React.ReactNode> = {
  'client-keeper': <Users className="h-8 w-8" />,
  'atticus': <Share2 className="h-8 w-8" />,
  'nicole': <Globe className="h-8 w-8" />,
};

export default function SelectProductPage() {
  const router = useRouter();

  const handleSelectProduct = (productId: string) => {
    // Store selected product in localStorage
    localStorage.setItem('admin-product', productId);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-hub-muted/30 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-hub-foreground mb-2">
            Select a Product
          </h1>
          <p className="text-hub-muted-foreground">
            Choose which product you want to manage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* All Things Agents Hub */}
          <button
            onClick={() => handleSelectProduct('hub')}
            className="text-left"
          >
            <MagicCard
              className="h-full p-6 bg-white border border-hub-border hover:border-hub-foreground/30 transition-colors cursor-pointer"
              gradientColor="#00000010"
            >
              <div className="w-12 h-12 rounded-xl bg-hub-muted flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-hub-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-hub-foreground mb-1">
                Hub
              </h3>
              <p className="text-sm text-hub-muted-foreground">
                All Things Agents homepage
              </p>
            </MagicCard>
          </button>

          {/* Product Cards */}
          {Object.values(products).map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="text-left"
            >
              <MagicCard
                className="h-full p-6 bg-white border border-hub-border hover:border-hub-foreground/30 transition-colors cursor-pointer"
                gradientColor={product.colors.accent + '20'}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: product.colors.accent + '15', color: product.colors.accent }}
                >
                  {productIcons[product.id]}
                </div>
                <h3 className="font-display text-lg font-semibold text-hub-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-hub-muted-foreground">
                  {product.tagline}
                </p>
              </MagicCard>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
