"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gta6hub_progress";

interface ProgressData {
  newsViewed: string[];
  tipsViewed: string[];
  vehiclesViewed: string[];
  charactersViewed: string[];
  locationsViewed: string[];
  weaponsViewed: string[];
}

const DEFAULTS: ProgressData = {
  newsViewed: [],
  tipsViewed: [],
  vehiclesViewed: [],
  charactersViewed: [],
  locationsViewed: [],
  weaponsViewed: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const markViewed = useCallback(
    (category: keyof ProgressData, slug: string) => {
      setProgress((prev) => {
        if (prev[category].includes(slug)) return prev;
        const next = { ...prev, [category]: [...prev[category], slug] };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isViewed = useCallback(
    (category: keyof ProgressData, slug: string) =>
      progress[category].includes(slug),
    [progress]
  );

  const stats = {
    news: { viewed: progress.newsViewed.length, total: 8 },
    tips: { viewed: progress.tipsViewed.length, total: 4 },
    vehicles: { viewed: progress.vehiclesViewed.length, total: 10 },
    characters: { viewed: progress.charactersViewed.length, total: 8 },
    locations: { viewed: progress.locationsViewed.length, total: 12 },
    weapons: { viewed: progress.weaponsViewed.length, total: 8 },
  };

  const overallPercentage = Math.round(
    (stats.news.viewed +
      stats.tips.viewed +
      stats.vehicles.viewed +
      stats.characters.viewed +
      stats.locations.viewed +
      stats.weapons.viewed) /
      (stats.news.total +
        stats.tips.total +
        stats.vehicles.total +
        stats.characters.total +
        stats.locations.total +
        stats.weapons.total) *
      100
  );

  return { progress, loaded, markViewed, isViewed, stats, overallPercentage };
}
