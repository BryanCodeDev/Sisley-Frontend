'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const QuickViewContext = createContext(null);

export function QuickViewProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const openQuickView = useCallback((productData) => {
    setProduct(productData);
    setOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setOpen(false);
    setProduct(null);
  }, []);

  return (
    <QuickViewContext.Provider value={{ open, product, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    return { open: false, product: null, openQuickView: () => {}, closeQuickView: () => {} };
  }
  return context;
}
