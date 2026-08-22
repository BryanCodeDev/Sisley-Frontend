'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/app/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const response = await api.get('/api/auth/me', { ignore401: true });
        if (response && response.success && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(email, password) {
    try {
      setError(null);
      const response = await api.post('/api/auth/login', { email, password });
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: 'Respuesta inesperada del servidor' };
    } catch (err) {
      const message = err.message || 'Error al iniciar sesión';
      setError(message);
      return { success: false, message };
    }
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err.message);
    } finally {
      setUser(null);
      setError(null);
    }
  }

  function hasPermission(permission) {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
