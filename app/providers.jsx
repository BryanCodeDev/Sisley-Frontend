'use client';

import { AuthProvider } from './contexts/AuthContext';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { QuickViewProvider } from './contexts/QuickViewContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <FavoritesProvider>
          <QuickViewProvider>
            {children}
          </QuickViewProvider>
        </FavoritesProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  );
}
