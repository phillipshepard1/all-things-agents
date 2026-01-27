'use client';

import { createContext, useContext, ReactNode } from 'react';
import { products, type ProductId, type Product } from './config';

interface ProductContextType {
  product: Product | null;
  productId: ProductId | null;
}

const ProductContext = createContext<ProductContextType>({
  product: null,
  productId: null,
});

export function ProductProvider({
  children,
  productId,
}: {
  children: ReactNode;
  productId: ProductId | null;
}) {
  const product = productId ? products[productId] : null;

  return (
    <ProductContext.Provider value={{ product, productId }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
