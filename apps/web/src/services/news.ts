import { newsRepository } from "@/repositories/news";

export const newsService = {
  async getAll(params: {
    page?: number;
    pageSize?: number;
    category?: string;
  }) {
    return newsRepository.findMany(params);
  },

  async getBySlug(slug: string) {
    const news = await newsRepository.findBySlug(slug);
    if (news) {
      await newsRepository.incrementViews(news.id);
    }
    return news;
  },

  async getTrending(limit?: number) {
    return newsRepository.findTrending(limit);
  },

  async create(data: {
    title: string;
    slug: string;
    description: string;
    content: string;
    coverImage?: string;
    category: string;
    source: string;
    sourceUrl: string;
    publishedAt: Date;
  }) {
    return newsRepository.create(data);
  },

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      coverImage?: string;
      category?: string;
      source?: string;
      sourceUrl?: string;
      status?: string;
    }
  ) {
    return newsRepository.update(id, data);
  },

  async delete(id: string) {
    return newsRepository.delete(id);
  },
};
