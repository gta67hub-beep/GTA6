import { prisma } from "@/database/client";
import { Prisma } from "@prisma/client";

export interface FindManyOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  class?: string;
  category?: string;
}

// ============================================
// VEHICLES
// ============================================

export const vehiclesRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search, class: vehicleClass } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.VehicleWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
      ...(vehicleClass && { class: vehicleClass }),
    };

    const [data, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.vehicle.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.vehicle.findUnique({ where: { slug } });
  },

  async create(data: Prisma.VehicleCreateInput) {
    return prisma.vehicle.create({ data });
  },

  async update(id: string, data: Prisma.VehicleUpdateInput) {
    return prisma.vehicle.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.vehicle.delete({ where: { id } });
  },
};

// ============================================
// WEAPONS
// ============================================

export const weaponsRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search, category } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.WeaponWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
      ...(category && { category }),
    };

    const [data, total] = await Promise.all([
      prisma.weapon.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.weapon.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.weapon.findUnique({ where: { slug } });
  },

  async create(data: Prisma.WeaponCreateInput) {
    return prisma.weapon.create({ data });
  },

  async update(id: string, data: Prisma.WeaponUpdateInput) {
    return prisma.weapon.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.weapon.delete({ where: { id } });
  },
};

// ============================================
// CHARACTERS
// ============================================

export const charactersRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.CharacterWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.character.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.character.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.character.findUnique({
      where: { slug },
      include: { missions: true },
    });
  },

  async create(data: Prisma.CharacterCreateInput) {
    return prisma.character.create({ data });
  },

  async update(id: string, data: Prisma.CharacterUpdateInput) {
    return prisma.character.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.character.delete({ where: { id } });
  },
};

// ============================================
// MISSIONS
// ============================================

export const missionsRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.MissionWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.mission.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
        include: { character: { select: { name: true, slug: true } } },
      }),
      prisma.mission.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.mission.findUnique({
      where: { slug },
      include: { character: true },
    });
  },

  async create(data: Prisma.MissionCreateInput) {
    return prisma.mission.create({ data });
  },

  async update(id: string, data: Prisma.MissionUpdateInput) {
    return prisma.mission.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.mission.delete({ where: { id } });
  },
};

// ============================================
// LOCATIONS
// ============================================

export const locationsRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.LocationWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.location.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.location.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.location.findUnique({ where: { slug } });
  },

  async create(data: Prisma.LocationCreateInput) {
    return prisma.location.create({ data });
  },

  async update(id: string, data: Prisma.LocationUpdateInput) {
    return prisma.location.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.location.delete({ where: { id } });
  },
};

// ============================================
// COLLECTIBLES
// ============================================

export const collectiblesRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search, category } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.CollectibleWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
      ...(category && { category }),
    };

    const [data, total] = await Promise.all([
      prisma.collectible.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.collectible.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.collectible.findUnique({ where: { slug } });
  },

  async create(data: Prisma.CollectibleCreateInput) {
    return prisma.collectible.create({ data });
  },

  async update(id: string, data: Prisma.CollectibleUpdateInput) {
    return prisma.collectible.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.collectible.delete({ where: { id } });
  },
};

// ============================================
// PROPERTIES
// ============================================

export const propertiesRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, search } = options;
    const skip = (page - 1) * pageSize;

    const where: Prisma.PropertyWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.property.count({ where }),
    ]);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async findBySlug(slug: string) {
    return prisma.property.findUnique({ where: { slug } });
  },

  async create(data: Prisma.PropertyCreateInput) {
    return prisma.property.create({ data });
  },

  async update(id: string, data: Prisma.PropertyUpdateInput) {
    return prisma.property.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.property.delete({ where: { id } });
  },
};
