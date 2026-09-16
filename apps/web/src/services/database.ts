import {
  vehiclesRepository,
  weaponsRepository,
  charactersRepository,
  missionsRepository,
  locationsRepository,
  collectiblesRepository,
  propertiesRepository,
} from "@/repositories/database";

export const vehiclesService = {
  getAll: (params: Parameters<typeof vehiclesRepository.findMany>[0]) =>
    vehiclesRepository.findMany(params),
  getBySlug: (slug: string) => vehiclesRepository.findBySlug(slug),
  create: (data: Parameters<typeof vehiclesRepository.create>[0]) =>
    vehiclesRepository.create(data),
  update: (id: string, data: Parameters<typeof vehiclesRepository.update>[1]) =>
    vehiclesRepository.update(id, data),
  delete: (id: string) => vehiclesRepository.delete(id),
};

export const weaponsService = {
  getAll: (params: Parameters<typeof weaponsRepository.findMany>[0]) =>
    weaponsRepository.findMany(params),
  getBySlug: (slug: string) => weaponsRepository.findBySlug(slug),
  create: (data: Parameters<typeof weaponsRepository.create>[0]) =>
    weaponsRepository.create(data),
  update: (id: string, data: Parameters<typeof weaponsRepository.update>[1]) =>
    weaponsRepository.update(id, data),
  delete: (id: string) => weaponsRepository.delete(id),
};

export const charactersService = {
  getAll: (params: Parameters<typeof charactersRepository.findMany>[0]) =>
    charactersRepository.findMany(params),
  getBySlug: (slug: string) => charactersRepository.findBySlug(slug),
  create: (data: Parameters<typeof charactersRepository.create>[0]) =>
    charactersRepository.create(data),
  update: (id: string, data: Parameters<typeof charactersRepository.update>[1]) =>
    charactersRepository.update(id, data),
  delete: (id: string) => charactersRepository.delete(id),
};

export const missionsService = {
  getAll: (params: Parameters<typeof missionsRepository.findMany>[0]) =>
    missionsRepository.findMany(params),
  getBySlug: (slug: string) => missionsRepository.findBySlug(slug),
  create: (data: Parameters<typeof missionsRepository.create>[0]) =>
    missionsRepository.create(data),
  update: (id: string, data: Parameters<typeof missionsRepository.update>[1]) =>
    missionsRepository.update(id, data),
  delete: (id: string) => missionsRepository.delete(id),
};

export const locationsService = {
  getAll: (params: Parameters<typeof locationsRepository.findMany>[0]) =>
    locationsRepository.findMany(params),
  getBySlug: (slug: string) => locationsRepository.findBySlug(slug),
  create: (data: Parameters<typeof locationsRepository.create>[0]) =>
    locationsRepository.create(data),
  update: (id: string, data: Parameters<typeof locationsRepository.update>[1]) =>
    locationsRepository.update(id, data),
  delete: (id: string) => locationsRepository.delete(id),
};

export const collectiblesService = {
  getAll: (params: Parameters<typeof collectiblesRepository.findMany>[0]) =>
    collectiblesRepository.findMany(params),
  getBySlug: (slug: string) => collectiblesRepository.findBySlug(slug),
  create: (data: Parameters<typeof collectiblesRepository.create>[0]) =>
    collectiblesRepository.create(data),
  update: (id: string, data: Parameters<typeof collectiblesRepository.update>[1]) =>
    collectiblesRepository.update(id, data),
  delete: (id: string) => collectiblesRepository.delete(id),
};

export const propertiesService = {
  getAll: (params: Parameters<typeof propertiesRepository.findMany>[0]) =>
    propertiesRepository.findMany(params),
  getBySlug: (slug: string) => propertiesRepository.findBySlug(slug),
  create: (data: Parameters<typeof propertiesRepository.create>[0]) =>
    propertiesRepository.create(data),
  update: (id: string, data: Parameters<typeof propertiesRepository.update>[1]) =>
    propertiesRepository.update(id, data),
  delete: (id: string) => propertiesRepository.delete(id),
};
