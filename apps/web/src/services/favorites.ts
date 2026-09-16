import { favoritesRepository } from "@/repositories/favorites";

export const favoritesService = {
  async getAll(userId: string) {
    return favoritesRepository.findByUser(userId);
  },

  async add(userId: string, entityType: string, entityId: string) {
    const existing = await favoritesRepository.find(userId, entityType, entityId);
    if (existing) {
      return existing;
    }
    return favoritesRepository.add(userId, entityType, entityId);
  },

  async remove(userId: string, entityType: string, entityId: string) {
    return favoritesRepository.remove(userId, entityType, entityId);
  },

  async check(userId: string, entityType: string, entityId: string) {
    return favoritesRepository.check(userId, entityType, entityId);
  },

  async getCounts(userId: string) {
    return favoritesRepository.countByEntityType(userId);
  },
};
