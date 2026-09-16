import { searchRepository } from "@/repositories/search";

export const searchService = {
  async search(query: string, category?: string) {
    if (!query || query.length < 2) {
      return [];
    }
    return searchRepository.search(query, category);
  },
};
