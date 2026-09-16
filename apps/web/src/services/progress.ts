import { progressRepository } from "@/repositories/progress";

export const progressService = {
  async getAll(userId: string) {
    return progressRepository.findByUser(userId);
  },

  async toggle(userId: string, entityType: string, entityId: string) {
    return progressRepository.toggle(userId, entityType, entityId);
  },

  async getSummary(userId: string) {
    return progressRepository.getSummary(userId);
  },
};
