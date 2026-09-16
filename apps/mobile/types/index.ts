export type UserRole = "user" | "editor" | "admin";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  username?: string;
  imageUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type NewsCategory =
  | "rockstar"
  | "gta6"
  | "gameplay"
  | "vehicles"
  | "characters"
  | "map"
  | "updates"
  | "community";

export type TipCategory =
  | "money"
  | "vehicles"
  | "combat"
  | "missions"
  | "exploration"
  | "beginner"
  | "advanced"
  | "secrets";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ContentStatus = "draft" | "published" | "archived";

export type FavoriteEntityType =
  | "news"
  | "tip"
  | "vehicle"
  | "weapon"
  | "character"
  | "mission"
  | "location"
  | "collectible"
  | "property";

export interface News {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  category: NewsCategory;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  trendingScore: number;
  status: ContentStatus;
  createdAt: string;
}

export interface Tip {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullExplanation: string;
  category: TipCategory;
  difficulty: Difficulty;
  image?: string;
  tags: string[];
  views: number;
  likes: number;
  trendingScore: number;
  isCommunityTheory: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  class?: string;
  price: string;
  topSpeed: string;
  acceleration: string;
  handling: string;
  location?: string;
  availability: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Weapon {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category?: string;
  damage: string;
  fireRate: string;
  range: string;
  accuracy: string;
  availability: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  role?: string;
  affiliation?: string;
  status: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Mission {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  chapter?: string;
  type?: string;
  difficulty?: string;
  reward: string;
  location?: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  characterId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  type?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Collectible {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  type?: string;
  price: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  entityType: FavoriteEntityType;
  entityId: string;
  createdAt: string;
}

export interface Progress {
  id: string;
  userId: string;
  entityType: FavoriteEntityType;
  entityId: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
