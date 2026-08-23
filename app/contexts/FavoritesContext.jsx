'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'sisley_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch {
      // localStorage full or unavailable
    }
  };

  const addFavorite = (product) => {
    if (!product || favorites.some((p) => p.id === product.id)) return;
    saveFavorites([...favorites, product]);
  };

  const removeFavorite = (productId) => {
    saveFavorites(favorites.filter((p) => p.id !== productId));
  };

  const isFavorite = (productId) => favorites.some((p) => p.id === productId);

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
