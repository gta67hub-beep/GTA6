import { api } from "./api";
import {
  Vehicle,
  Weapon,
  Character,
  Mission,
  Location,
  Collectible,
  Property,
  ApiResponse,
  PaginatedResponse,
} from "../types";

export const vehiclesService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Vehicle>("/api/vehicles", params),
  getBySlug: (slug: string) =>
    api.get<Vehicle>(`/api/vehicles/${slug}`),
};

export const weaponsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Weapon>("/api/weapons", params),
  getBySlug: (slug: string) =>
    api.get<Weapon>(`/api/weapons/${slug}`),
};

export const charactersService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Character>("/api/characters", params),
  getBySlug: (slug: string) =>
    api.get<Character>(`/api/characters/${slug}`),
};

export const missionsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Mission>("/api/missions", params),
  getBySlug: (slug: string) =>
    api.get<Mission>(`/api/missions/${slug}`),
};

export const locationsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Location>("/api/locations", params),
  getBySlug: (slug: string) =>
    api.get<Location>(`/api/locations/${slug}`),
};

export const collectiblesService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Collectible>("/api/collectibles", params),
  getBySlug: (slug: string) =>
    api.get<Collectible>(`/api/collectibles/${slug}`),
};

export const propertiesService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Property>("/api/properties", params),
  getBySlug: (slug: string) =>
    api.get<Property>(`/api/properties/${slug}`),
};
