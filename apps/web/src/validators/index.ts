import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(20),
});

export const newsSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  category: z.string(),
  source: z.string().min(1).max(100),
  sourceUrl: z.string().url(),
  publishedAt: z.coerce.date(),
  status: z.string().optional(),
});

export const tipSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  shortDescription: z.string().min(1).max(300),
  fullExplanation: z.string().min(1),
  category: z.string(),
  difficulty: z.string(),
  image: z.string().url().optional(),
  tags: z.string().default("[]"),
  isCommunityTheory: z.boolean().default(false),
  status: z.string().optional(),
});

export const vehicleSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  class: z.string().optional(),
  price: z.string().default("Unknown"),
  topSpeed: z.string().default("Unknown"),
  acceleration: z.string().default("Unknown"),
  handling: z.string().default("Unknown"),
  location: z.string().optional(),
  availability: z.string().default("Coming soon"),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const weaponSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  category: z.string().optional(),
  damage: z.string().default("Unknown"),
  fireRate: z.string().default("Unknown"),
  range: z.string().default("Unknown"),
  accuracy: z.string().default("Unknown"),
  availability: z.string().default("Coming soon"),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const characterSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  role: z.string().optional(),
  affiliation: z.string().optional(),
  status: z.string().default("Unknown"),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const missionSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  chapter: z.string().optional(),
  type: z.string().optional(),
  difficulty: z.string().optional(),
  reward: z.string().default("Unknown"),
  location: z.string().optional(),
  characterId: z.string().optional(),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const locationSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  type: z.string().optional(),
  region: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const collectibleSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const propertySchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  image: z.string().url().optional(),
  type: z.string().optional(),
  price: z.string().default("Unknown"),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  tags: z.string().default("[]"),
  metadata: z.string().optional(),
});

export const searchSchema = z.object({
  q: z.string().min(2).max(100),
  category: z.string().optional(),
});

export const favoriteSchema = z.object({
  entityType: z.string(),
  entityId: z.string().min(1),
});
