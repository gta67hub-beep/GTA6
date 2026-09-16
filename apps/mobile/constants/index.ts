import { NewsCategory, TipCategory, FavoriteEntityType } from "../types";

export const COLORS = {
  primary: "#E11D48",
  dark: "#0A0A0A",
  dark50: "#18181B",
  dark100: "#27272A",
  dark200: "#3F3F46",
  dark300: "#52525B",
  dark400: "#71717A",
  dark500: "#A1A1AA",
  dark600: "#D4D4D8",
  white: "#FAFAFA",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
} as const;

export const NEWS_CATEGORIES: { value: NewsCategory; label: string }[] = [
  { value: "rockstar", label: "Rockstar" },
  { value: "gta6", label: "GTA 6" },
  { value: "gameplay", label: "Gameplay" },
  { value: "vehicles", label: "Vehicles" },
  { value: "characters", label: "Characters" },
  { value: "map", label: "Map" },
  { value: "updates", label: "Updates" },
  { value: "community", label: "Community" },
];

export const TIP_CATEGORIES: { value: TipCategory; label: string }[] = [
  { value: "money", label: "Money" },
  { value: "vehicles", label: "Vehicles" },
  { value: "combat", label: "Combat" },
  { value: "missions", label: "Missions" },
  { value: "exploration", label: "Exploration" },
  { value: "beginner", label: "Beginner" },
  { value: "advanced", label: "Advanced" },
  { value: "secrets", label: "Secrets" },
];

export const FAVORITE_ENTITY_LABELS: Record<FavoriteEntityType, string> = {
  news: "News",
  tip: "Tips",
  vehicle: "Vehicles",
  weapon: "Weapons",
  character: "Characters",
  mission: "Missions",
  location: "Locations",
  collectible: "Collectibles",
  property: "Properties",
};

export const MAP_MARKER_CATEGORIES = [
  "Missions",
  "Vehicles",
  "Weapons",
  "Shops",
  "Properties",
  "Collectibles",
  "Secrets",
  "Locations",
] as const;

export const PLACEHOLDER = {
  NOT_CONFIRMED: "Not confirmed",
  UNKNOWN: "Unknown",
  COMING_SOON: "Coming soon",
} as const;

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 50,
} as const;
