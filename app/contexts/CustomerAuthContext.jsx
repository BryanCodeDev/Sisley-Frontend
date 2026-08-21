'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/app/services/api';

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCustomer() {
      try {
        setLoading(true);
        const response = await api.get('/api/auth/customer/me');
        if (response.success && response.data) {
          setCustomer(response.data);
        } else {
          setCustomer(null);
        }
      } catch (err) {
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, []);

  async function login(email, password) {
    try {
      setError(null);
      const response = await api.post('/api/auth/customer/login', { email, password });
      if (response.success && response.data) {
        setCustomer(response.data.customer);
        return { success: true };
      }
      return { success: false, message: 'Respuesta inesperada del servidor' };
    } catch (err) {
      const message = err.message || 'Error al iniciar sesión';
      setError(message);
      return { success: false, message };
    }
  }

  async function register(data) {
    try {
      setError(null);
      const response = await api.post('/api/auth/customer/register', data);
      if (response.success && response.data) {
        setCustomer(response.data.customer);
        return { success: true };
      }
      return { success: false, message: 'Respuesta inesperada del servidor' };
    } catch (err) {
      const message = err.message || 'Error al registrar';
      setError(message);
      return { success: false, message };
    }
  }

  async function logout() {
    try {
      await api.post('/api/auth/customer/logout');
    } catch (err) {
      console.error('Logout error:', err.message);
    } finally {
      setCustomer(null);
      setError(null);
    }
  }

  const value = {
    customer,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!customer,
  };

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
