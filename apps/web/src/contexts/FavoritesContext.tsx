"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const STORAGE_KEY = "gta6hub_favorites";

type EntityType = "vehicle" | "news" | "tip" | "character" | "location" | "weapon";

interface FavoriteItem {
  id: string;
  name: string;
  slug: string;
  type: EntityType;
  addedAt: number;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  loaded: boolean;
  toggleFavorite: (item: Omit<FavoriteItem, "addedAt">) => void;
  isFavorite: (id: string, type: EntityType) => boolean;
  getByType: (type: EntityType) => FavoriteItem[];
  counts: Record<string, number>;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.id === item.id && f.type === item.type);
        const next = exists
          ? prev.filter((f) => !(f.id === item.id && f.type === item.type))
          : [...prev, { ...item, addedAt: Date.now() }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (id: string, type: EntityType) =>
      favorites.some((f) => f.id === id && f.type === type),
    [favorites]
  );

  const getByType = useCallback(
    (type: EntityType) => favorites.filter((f) => f.type === type),
    [favorites]
  );

  const counts = {
    vehicles: getByType("vehicle").length,
    news: getByType("news").length,
    tips: getByType("tip").length,
    characters: getByType("character").length,
    locations: getByType("location").length,
    weapons: getByType("weapon").length,
    total: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loaded, toggleFavorite, isFavorite, getByType, counts }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
