import { tipsRepository } from "@/repositories/tips";

export const tipsService = {
  async getAll(params: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
  }) {
    return tipsRepository.findMany(params);
  },

  async getBySlug(slug: string) {
    const tip = await tipsRepository.findBySlug(slug);
    if (tip) {
      await tipsRepository.incrementViews(tip.id);
    }
    return tip;
  },

  async getTrending(limit?: number) {
    return tipsRepository.findTrending(limit);
  },

  async create(data: {
    title: string;
    slug: string;
    shortDescription: string;
    fullExplanation: string;
    category: string;
    difficulty: string;
    image?: string;
    tags: string;
    isCommunityTheory?: boolean;
  }) {
    return tipsRepository.create(data);
  },

  async update(
    id: string,
    data: {
      title?: string;
      shortDescription?: string;
      fullExplanation?: string;
      category?: string;
      difficulty?: string;
      image?: string;
      tags?: string;
      isCommunityTheory?: boolean;
      status?: string;
    }
  ) {
    return tipsRepository.update(id, data);
  },

  async delete(id: string) {
    return tipsRepository.delete(id);
  },
};
