import { create } from "zustand";

interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

interface FavoriteState {
  favorites: Record<string, string[]>;
  addFavorite: (entityType: string, entityId: string) => void;
  removeFavorite: (entityType: string, entityId: string) => void;
  isFavorite: (entityType: string, entityId: string) => boolean;
  setFavorites: (favorites: Record<string, string[]>) => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: {},
  addFavorite: (entityType, entityId) =>
    set((state) => ({
      favorites: {
        ...state.favorites,
        [entityType]: [...(state.favorites[entityType] || []), entityId],
      },
    })),
  removeFavorite: (entityType, entityId) =>
    set((state) => ({
      favorites: {
        ...state.favorites,
        [entityType]: (state.favorites[entityType] || []).filter(
          (id) => id !== entityId
        ),
      },
    })),
  isFavorite: (entityType, entityId) => {
    const state = get();
    return (state.favorites[entityType] || []).includes(entityId);
  },
  setFavorites: (favorites) => set({ favorites }),
}));

interface ProgressState {
  progress: Record<string, boolean>;
  toggleProgress: (entityType: string, entityId: string) => void;
  isCompleted: (entityType: string, entityId: string) => boolean;
  setProgress: (progress: Record<string, boolean>) => void;
  getCompletionPercent: (entityType: string, total: number) => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},
  toggleProgress: (entityType, entityId) =>
    set((state) => {
      const key = `${entityType}:${entityId}`;
      return {
        progress: {
          ...state.progress,
          [key]: !state.progress[key],
        },
      };
    }),
  isCompleted: (entityType, entityId) => {
    const state = get();
    const key = `${entityType}:${entityId}`;
    return state.progress[key] || false;
  },
  setProgress: (progress) => set({ progress }),
  getCompletionPercent: (entityType, total) => {
    if (total === 0) return 0;
    const state = get();
    const completed = Object.keys(state.progress).filter(
      (key) => key.startsWith(`${entityType}:`) && state.progress[key]
    ).length;
    return Math.round((completed / total) * 100);
  },
}));
