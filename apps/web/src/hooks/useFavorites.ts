"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gta6hub_favorites";

type EntityType = "vehicle" | "news" | "tip" | "character" | "location" | "weapon";

interface FavoriteItem {
  id: string;
  name: string;
  slug: string;
  type: EntityType;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const persist = useCallback((items: FavoriteItem[]) => {
    setFavorites(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      const exists = favorites.find(
        (f) => f.id === item.id && f.type === item.type
      );
      if (exists) {
        persist(favorites.filter((f) => !(f.id === item.id && f.type === item.type)));
      } else {
        persist([...favorites, { ...item, addedAt: Date.now() }]);
      }
    },
    [favorites, persist]
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

  return { favorites, loaded, toggleFavorite, isFavorite, getByType, counts };
}
