'use client';

import { AuthProvider } from './contexts/AuthContext';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  );
}
