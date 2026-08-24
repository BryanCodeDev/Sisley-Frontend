'use client';

import { useQuickView } from '@/app/contexts/QuickViewContext';
import QuickViewModal from './QuickViewModal';

export default function QuickViewModalRenderer() {
  const { open, product, closeQuickView } = useQuickView();

  if (!open || !product) return null;

  return <QuickViewModal product={product} open={open} onClose={closeQuickView} />;
}
