import { api } from "./api";
import { ApiResponse } from "../types";

export interface SearchResult {
  type: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export const searchService = {
  search: (query: string, category?: string) =>
    api.get<SearchResult[]>("/api/search", { q: query, category: category || "" }),

  getRecent: () =>
    api.get<string[]>("/api/search/recent"),
};
