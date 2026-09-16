import { useQuery } from "@tanstack/react-query";
import {
  vehiclesService,
  weaponsService,
  charactersService,
  missionsService,
  locationsService,
  collectiblesService,
  propertiesService,
} from "../services/database";

export function useVehicles(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["vehicles", params],
    queryFn: () => vehiclesService.getAll(params),
  });
}

export function useVehicleBySlug(slug: string) {
  return useQuery({
    queryKey: ["vehicle", slug],
    queryFn: () => vehiclesService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useWeapons(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["weapons", params],
    queryFn: () => weaponsService.getAll(params),
  });
}

export function useWeaponBySlug(slug: string) {
  return useQuery({
    queryKey: ["weapon", slug],
    queryFn: () => weaponsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCharacters(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["characters", params],
    queryFn: () => charactersService.getAll(params),
  });
}

export function useCharacterBySlug(slug: string) {
  return useQuery({
    queryKey: ["character", slug],
    queryFn: () => charactersService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useMissions(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["missions", params],
    queryFn: () => missionsService.getAll(params),
  });
}

export function useMissionBySlug(slug: string) {
  return useQuery({
    queryKey: ["mission", slug],
    queryFn: () => missionsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useLocations(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => locationsService.getAll(params),
  });
}

export function useLocationBySlug(slug: string) {
  return useQuery({
    queryKey: ["location", slug],
    queryFn: () => locationsService.getBySlug(slug),
    enabled: !!slug,
  });
}
