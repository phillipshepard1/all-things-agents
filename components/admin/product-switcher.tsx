'use client';

import { useRouter } from 'next/navigation';
import { useAdminProduct } from '@/lib/products/admin-context';
import { products } from '@/lib/products/config';
import { ChevronDown, Building2, Users, Share2, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const productIcons: Record<string, React.ReactNode> = {
  'hub': <Building2 className="h-4 w-4" />,
  'client-keeper': <Users className="h-4 w-4" />,
  'atticus': <Share2 className="h-4 w-4" />,
  'nicole': <Globe className="h-4 w-4" />,
};

const productLabels: Record<string, string> = {
  'hub': 'Hub',
  'client-keeper': 'Client Keeper',
  'atticus': 'Atticus',
  'nicole': 'Nicole',
};

export function ProductSwitcher() {
  const router = useRouter();
  const { selectedProduct, setSelectedProduct } = useAdminProduct();

  const handleSwitch = (productId: string) => {
    setSelectedProduct(productId as 'hub' | 'client-keeper' | 'atticus' | 'nicole');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-hub-muted transition-colors">
        {selectedProduct && productIcons[selectedProduct]}
        <span className="font-medium">
          {selectedProduct ? productLabels[selectedProduct] : 'Select Product'}
        </span>
        <ChevronDown className="h-4 w-4 text-hub-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={() => handleSwitch('hub')}>
          <Building2 className="h-4 w-4 mr-2" />
          Hub
        </DropdownMenuItem>
        {Object.values(products).map((product) => (
          <DropdownMenuItem key={product.id} onClick={() => handleSwitch(product.id)}>
            {productIcons[product.id]}
            <span className="ml-2">{product.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
