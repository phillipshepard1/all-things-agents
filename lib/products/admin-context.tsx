'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products, type ProductId, type Product } from './config';

export type AdminProductId = ProductId | 'hub';

interface AdminProductContextType {
  selectedProduct: AdminProductId | null;
  product: Product | null;
  setSelectedProduct: (id: AdminProductId) => void;
  isLoading: boolean;
}

const AdminProductContext = createContext<AdminProductContextType>({
  selectedProduct: null,
  product: null,
  setSelectedProduct: () => {},
  isLoading: true,
});

// Cookie helper - set cookie for server-side access
function setAdminProductCookie(id: AdminProductId) {
  document.cookie = `admin-product=${id}; path=/admin; max-age=31536000; SameSite=Lax`;
}

export function AdminProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProductState] = useState<AdminProductId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin-product') as AdminProductId | null;
    if (stored) {
      setSelectedProductState(stored);
      // Sync cookie with localStorage on mount
      setAdminProductCookie(stored);
    }
    setIsLoading(false);
  }, []);

  const setSelectedProduct = (id: AdminProductId) => {
    localStorage.setItem('admin-product', id);
    setAdminProductCookie(id);
    setSelectedProductState(id);
  };

  const product = selectedProduct && selectedProduct !== 'hub'
    ? products[selectedProduct as ProductId]
    : null;

  return (
    <AdminProductContext.Provider value={{ selectedProduct, product, setSelectedProduct, isLoading }}>
      {children}
    </AdminProductContext.Provider>
  );
}

export function useAdminProduct() {
  return useContext(AdminProductContext);
}
