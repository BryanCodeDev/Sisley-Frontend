'use client';

import { AuthProvider } from './contexts/AuthContext';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CustomerAuthProvider>
        {children}
      </CustomerAuthProvider>
    </AuthProvider>
  );
}
